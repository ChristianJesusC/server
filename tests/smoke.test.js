// Tests de humo contra el servidor ya levantado (Docker + BD). Uso: API_URL=http://host:puerto npm test
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.API_URL || "http://localhost:8000";

async function req(method, path, body, token) {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json", ...(token && { Authorization: token }) },
    body: body && JSON.stringify(body),
  });
  const text = await res.text();
  let data = text;
  try { data = JSON.parse(text); } catch {}
  return { status: res.status, body: data, headers: res.headers };
}

const correo = `smoke-${Date.now()}@test.com`;
const abogado = { nombre: "s", apePat: "s", apeMat: "s", correo, contraseña: "secreto123", ocupacion: "Abogado" };

test("ruta protegida sin token -> 401 con formato de error", async () => {
  const { status, body } = await req("GET", "/abogado");
  assert.equal(status, 401);
  assert.equal(body.error.code, "AUTH_TOKEN_MISSING");
});

test("ruta inexistente -> 404 JSON", async () => {
  const { status, body } = await req("GET", "/nada");
  assert.equal(status, 404);
  assert.equal(body.error.code, "ROUTE_NOT_FOUND");
});

test("registro incompleto -> 400", async () => {
  assert.equal((await req("POST", "/abogado", { nombre: "x" })).status, 400);
});

test("registro -> duplicado 409 -> login -> listar/obtener sin contraseña -> borrar", async () => {
  assert.equal((await req("POST", "/abogado", abogado)).status, 201);
  assert.equal((await req("POST", "/abogado", abogado)).status, 409);

  assert.equal((await req("POST", "/abogado/login", { correo, contraseña: "mala" })).status, 401);
  const login = await req("POST", "/abogado/login", { correo, contraseña: abogado.contraseña });
  assert.equal(login.status, 200);
  const token = login.headers.get("auth-token");
  assert.ok(token);
  const id = login.body.payload.idAbogados;

  const lista = await req("GET", "/abogado", undefined, token);
  assert.equal(lista.status, 200);
  assert.ok(lista.body.payload.every((a) => !("contraseña" in a)));

  assert.equal((await req("GET", "/abogado/id/abc", undefined, token)).status, 400);
  const uno = await req("GET", `/abogado/id/${id}`, undefined, token);
  assert.equal(uno.status, 200);
  assert.ok(!("contraseña" in uno.body.payload));

  assert.equal((await req("DELETE", "/abogado", undefined, token)).status, 200);
  assert.equal((await req("POST", "/abogado/login", { correo, contraseña: abogado.contraseña })).status, 401);
});

test("casos: requiere token y CRUD + búsqueda parametrizada", async () => {
  assert.equal((await req("GET", "/caso")).status, 401);

  const correo2 = `smoke-caso-${Date.now()}@test.com`;
  const a = { ...abogado, correo: correo2 };
  await req("POST", "/abogado", a);
  const login = await req("POST", "/abogado/login", { correo: correo2, contraseña: a.contraseña });
  const token = login.headers.get("auth-token");
  const idAbogados = login.body.payload.idAbogados;

  assert.equal((await req("POST", "/caso", { idAbogados, idCliente: 1 }, token)).status, 400);

  const titulo = `smoke-caso-${Date.now()}`;
  const nuevo = await req("POST", "/caso", { Titulo: titulo, idAbogados, idCliente: 1, Descripcion: "d" }, token);
  assert.equal(nuevo.status, 201);
  const id = nuevo.body.payload.idCasos;

  assert.equal((await req("GET", `/caso/id/${id}`, undefined, token)).body.payload.Titulo, titulo);
  assert.equal((await req("GET", "/caso/id/abc", undefined, token)).status, 400);

  const upd = await req("PUT", `/caso/id/${id}`, { Titulo: `${titulo}-mod`, idCliente: 1 }, token);
  assert.equal(upd.status, 200);
  assert.equal((await req("PUT", "/caso/id/999999999", { Titulo: "x", idCliente: 1 }, token)).status, 404);

  const found = await req("GET", `/caso/buscar?searchBy=titulo&searchTerm=${titulo}`, undefined, token);
  assert.equal(found.body.payload.length, 1);
  const inj = await req("GET", `/caso/buscar?searchBy=titulo&searchTerm=${encodeURIComponent("' OR '1'='1")}`, undefined, token);
  assert.equal(inj.status, 200);
  assert.equal(inj.body.payload.length, 0);
  assert.equal((await req("GET", "/caso/buscar?searchBy=otro&searchTerm=x", undefined, token)).status, 400);

  assert.equal((await req("DELETE", `/caso/id/${id}`, undefined, token)).status, 200);
  assert.equal((await req("GET", `/caso/id/${id}`, undefined, token)).status, 404);

  await req("DELETE", "/abogado", undefined, token);
});
