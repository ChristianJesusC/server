// Tests de humo contra el servidor ya levantado (Docker + BD). Uso: API_URL=http://host:puerto npm test
const { test, after } = require("node:test");
const assert = require("node:assert/strict");

const BASE = process.env.API_URL || "http://localhost:8000";

async function req(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const text = await res.text();
  let data = text;
  try { data = JSON.parse(text); } catch {}
  return { status: res.status, body: data };
}

const titulo = `smoke-${Date.now()}`;
let idCaso, idCliente;

after(async () => {
  if (idCaso) await req("DELETE", `/casos/${idCaso}`);
  if (idCliente) await req("DELETE", `/ObCliente/${idCliente}`);
});

test("GET /abogados devuelve una lista", async () => {
  const { status, body } = await req("GET", "/abogados");
  assert.equal(status, 200);
  assert.ok(Array.isArray(body));
});

test("GET /casos/:id inexistente devuelve 404", async () => {
  assert.equal((await req("GET", "/casos/0")).status, 404);
});

test("PUT /actualizarCaso/:id inexistente devuelve 404", async () => {
  assert.equal((await req("PUT", "/actualizarCaso/0", { Titulo: "x" })).status, 404);
});

test("POST /agregarCaso -> GET /casos/:id -> PUT /actualizarCaso/:id", async (t) => {
  const abogados = (await req("GET", "/abogados")).body;
  if (!abogados.length) return t.skip("la BD no tiene abogados");
  const cliente = await req("POST", "/agregarCliente", { Nombre: titulo, apePat: "s", apeMat: "s" });
  assert.equal(cliente.status, 200);
  idCliente = cliente.body.idCliente;

  const caso = {
    Titulo: titulo, Subtitulo: "s", TipoJuicio: "t", EstadoExpediente: "e",
    PrimerLugar: "a", PrimeraFecha: "2026-01-01", SegundoLugar: "b", SegundaFecha: "2026-01-02",
    Descripcion: "d", idAbogados: abogados[0].idAbogados, idCliente,
    fechaRegistro: "2026-01-01", PrimeraFirma: "", SegundaFirma: "", TerceraFirma: "", CuartaFirma: "",
  };
  // /agregarCaso responde 200 aun si falla y no devuelve el id: se verifica buscando el caso
  await req("POST", "/agregarCaso", caso);
  const encontrados = (await req("GET", `/buscarCasos?searchBy=titulo&searchTerm=${titulo}`)).body;
  assert.equal(encontrados.length, 1, "el caso no quedó registrado");
  idCaso = encontrados[0].idCasos;

  assert.equal((await req("GET", `/casos/${idCaso}`)).status, 200);

  const { Titulo, ...resto } = caso;
  const upd = await req("PUT", `/actualizarCaso/${idCaso}`, { ...resto, Titulo: `${titulo}-mod` });
  assert.equal(upd.status, 200);
  assert.equal((await req("GET", `/casos/${idCaso}`)).body.Titulo, `${titulo}-mod`);
});
