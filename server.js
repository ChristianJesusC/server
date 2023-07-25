const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "garciasabogados.c8m3j4kqbjrp.us-east-2.rds.amazonaws.com",
  user: "gerenteprincipal",
  password: "abogadosgarcia123",
  database: "Garcia_Abogados",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión a la base de datos establecida");
});

function generarIdAleatorio() {
  return Math.floor(Math.random() * 9999) + 1;
}

function generarIdAleatorioCaso() {
  return Math.floor(Math.random() * 9999) + 1;
}

function generarIdAleatorioCliente() {
  return Math.floor(Math.random() * 9999) + 1;
}

function comprobarIdExistente(idAbogados, callback) {
  const sql = "SELECT COUNT(*) AS count FROM abogados WHERE idAbogados = ?";
  db.query(sql, [idAbogados], (err, result) => {
    if (err) {
      console.error("Error al comprobar el ID existente: ", err);
      callback(err, null);
    } else {
      const count = result[0].count;
      const existe = count > 0;
      callback(null, existe);
    }
  });
}

function comprobarCorreoExistente(correo, callback) {
  const sql = "SELECT COUNT(*) AS count FROM abogados WHERE correo = ?";
  db.query(sql, [correo], (err, result) => {
    if (err) {
      console.error("Error al comprobar el correo existente: ", err);
      callback(err, null, false);
    } else {
      const count = result[0].count;
      const existe = count > 0;
      callback(null, existe, existe);
    }
  });
}

function guardarAbogado(idAbogados, nombre, apePat, apeMat, correo, contraseña, ocupacion, callback) {
  const sql = "INSERT INTO abogados (idAbogados, nombre, apeMat, apePat, correo, contraseña, ocupacion) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [idAbogados, nombre, apeMat, apePat, correo, contraseña, ocupacion], (err, result) => {
    if (err) {
      console.error("Error al guardar el abogado: ", err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

app.get("/obtenerCaso/:idCaso", (req, res) => {
  const idCaso = req.params.idCaso;

  const sql = `SELECT * FROM Casos WHERE idCasos = ?`;

  db.query(sql, [idCaso], (err, result) => {
    if (err) {
      console.error("Error al obtener el caso: ", err);
      return res.status(500).json("Error interno del servidor");
    }

    if (result.length === 0) {
      return res.status(404).json("Caso no encontrado");
    }

    const caso = result[0];
    return res.json(caso);
  });
});

app.post('/agregarCliente', (req, res) => {
  const { Nombre, apePat, apeMat } = req.body;
  const idCliente = generarIdAleatorioCliente();

  const sql = 'INSERT INTO cliente (idCliente, Nombre, apePat, apeMat) VALUES (?, ?, ?, ?)';
  db.query(sql, [idCliente, Nombre, apePat, apeMat], (err, result) => {
    if (err) {
      console.error('Error al guardar el cliente: ', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const nuevoCliente = { idCliente };
    return res.json(nuevoCliente);
  });
});

app.get('/Obcliente', (req, res) => {
  const sql = 'SELECT * FROM cliente';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de clientes:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    return res.json(result);
  });
});

app.get('/Obcliente/:idCliente', (req, res) => {
  const { idCliente } = req.params;
  const sql = `SELECT * FROM cliente WHERE idCliente = ?`;

  db.query(sql, [idCliente], (err, result) => {
    if (err) {
      console.error('Error al obtener el cliente:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    return res.json(result[0]);
  });
});

app.post("/agregarCaso", (req, res) => {
  const { Titulo, Subtitulo, TipoJuicio, EstadoExpediente, PrimerLugar, PrimeraFecha, SegundoLugar, SegundaFecha, Descripcion, idAbogados, idCliente, fechaRegistro,PrimeraFirma,SegundaFirma,TerceraFirma,CuartaFirma } = req.body;
  const idCasos = generarIdAleatorioCaso();

  const sql = "INSERT INTO Casos (idCasos, Titulo, Subtitulo, TipoJuicio, EstadoExpediente, PrimerLugar, PrimeraFecha, SegundoLugar, SegundaFecha, Descripcion, idAbogados, idCliente, fechaRegistro, PrimeraFirma, SegundaFirma, TerceraFirma, CuartaFirma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [idCasos, Titulo, Subtitulo, TipoJuicio, EstadoExpediente, PrimerLugar, PrimeraFecha, SegundoLugar, SegundaFecha, Descripcion, idAbogados, idCliente, fechaRegistro,PrimeraFirma,SegundaFirma,TerceraFirma,CuartaFirma],
    (err) => {
      if (err) {
        return res.json("Error al registrar el caso");
      }
      return res.json("Caso registrado exitosamente");
    }
  );
});

app.get("/visualizar", (req, res) => {
  const sql = "SELECT * FROM abogados";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener los abogados: ", err);
      return res.json("Error al obtener los abogados");
    }
    return res.send(result);
  });
});

app.get('/visualCaso', (req, res) => {
  const sql = 'SELECT * FROM Casos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al cargar los casos:', err);
      return res.status(500).json('Error interno del servidor');
    }
    return res.json(result);
  });
});

app.put("/actualizarCaso/:idCasos", (req, res) => {
  const idCasos = req.params.idCasos;
  const {Titulo,Subtitulo,TipoJuicio,EstadoExpediente,PrimerLugar,PrimeraFecha,SegundoLugar,SegundaFecha,Descripcion,PrimeraFirma,SegundaFirma,TerceraFirma,CuartaFirma,idCliente} = req.body;

  const sql = `UPDATE Casos SET Titulo = ?,Subtitulo = ?,TipoJuicio = ?,EstadoExpediente = ?,PrimerLugar = ?,PrimeraFecha = ?,SegundoLugar = ?,SegundaFecha = ?,Descripcion = ?,PrimeraFirma = ?,SegundaFirma = ?,TerceraFirma = ?,CuartaFirma = ?,idCliente = ? WHERE idCasos = ?`;
  db.query(sql,[Titulo,Subtitulo,TipoJuicio,EstadoExpediente,PrimerLugar,PrimeraFecha,SegundoLugar,SegundaFecha,Descripcion,PrimeraFirma,SegundaFirma,TerceraFirma,CuartaFirma,idCliente,idCasos],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar el caso: ", err);
        return res.status(500).json("Error interno del servidor");
      }

      if (result.affectedRows === 0) {
        return res.status(404).json("El caso no existe");
      }

      return res.json("Caso actualizado exitosamente");
    }
  );
});

app.delete("/visualizar/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM abogados WHERE idAbogados = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el abogado: ", err);
      return res.status(500).json("Error al eliminar el abogado");
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("El abogado no existe");
    }

    return res.json("Abogado eliminado exitosamente");
  });
});

app.post("/conexion", (req, res) => {
  const sql = "SELECT * FROM abogados WHERE correo=? AND contraseña=?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("ERROR");
    }
    if (data.length > 0) {
      const usuario = data[0];
      const { idAbogados,nombre, apePat, apeMat, ocupacion } = usuario;
      return res.json({ mensaje: "Inicio correcto", idAbogados,nombre, apePat, apeMat, ocupacion });
    } else {
      return res.json({ mensaje: "Inicio fallido" });
    }
  });
});

app.post("/implementar", (req, res) => {
  const nombre = req.body.nombre;
  const apePat = req.body.apePat;
  const apeMat = req.body.apeMat;
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  const ocupacion = req.body.ocupacion;

  comprobarCorreoExistente(correo, (err, existeCorreo) => {
    if (err) {
      return res.json("Error al registrar el abogado");
    }
    if (existeCorreo) {
      return res.json("El correo ya está en uso");
    }

    let idAbogados = generarIdAleatorio();
    comprobarIdExistente(idAbogados, (err, existeId) => {
      if (err) {
        return res.json("Error al registrar el abogado");
      }
      while (existeId) {
        idAbogados = generarIdAleatorio();
        comprobarIdExistente(idAbogados, (err, existe) => {
          if (err) {
            return res.json("Error al registrar el abogado");
          }
        });
      }
      guardarAbogado(idAbogados, nombre, apePat, apeMat, correo, contraseña, ocupacion, (err, result) => {
        if (err) {
          return res.json("Error al registrar el abogado");
        } else {
          return res.send("Registrado con éxito");
        }
      });
    });
  });
});

app.get('/casos/:id', (req, res) => {
  const idCasos = req.params.id;
  const sql = 'SELECT * FROM Casos WHERE idCasos = ?';

  db.query(sql, [idCasos], (err, result) => {
    if (err) {
      console.error('Error al obtener el expediente:', err);
      return res.status(500).json('Error interno del servidor');
    }

    if (result.length === 0) {
      return res.status(404).json('El expediente no existe');
    }

    const expediente = result[0];
    return res.json(expediente);
  });
});

app.delete("/abogados/:id", (req, res) => {
  const idAbogados = req.params.id;
  const updateCasosSql = "UPDATE Casos SET idAbogados = 0 WHERE idAbogados = ?";
  db.query(updateCasosSql, [idAbogados], (err, result) => {
    if (err) {
      console.error("Error al actualizar registros en la tabla Casos: ", err);
      return res.status(500).json("Error interno del servidor");
    }
    const deleteAbogadoSql = "DELETE FROM abogados WHERE idAbogados = ?";
    db.query(deleteAbogadoSql, [idAbogados], (err, result) => {
      if (err) {
        console.error("Error al eliminar el abogado: ", err);
        return res.status(500).json("Error interno del servidor");
      }
      return res.json("Abogado eliminado exitosamente");
    });
  });
});

app.delete("/ObCliente/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cliente WHERE idCliente = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json("Error al eliminar el cliente");
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("El cliente no existe");
    }

    return res.json("Cliente eliminado exitosamente");
  });
});

app.get('/buscarCasos', (req, res) => {
  const { searchTerm, searchBy } = req.query;
  let sql = 'SELECT * FROM Casos';

  if (searchTerm && searchBy === 'codigo') {
    sql += ` WHERE idCasos LIKE '%${searchTerm}%'`;
  } else if (searchTerm && searchBy === 'titulo') {
    sql += ` WHERE Titulo LIKE '%${searchTerm}%'`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al realizar la búsqueda de casos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    return res.json(result);
  });
});

app.get('/abogados/:idAbogados', (req, res) => {
  const { idAbogados } = req.params;
  const sql = 'SELECT * FROM abogados WHERE idAbogados = ?';
  db.query(sql, [idAbogados], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Abogado no encontrado' });
    }
    const abogado = result[0];

    return res.json(abogado);
  });
});

app.get('/abogados', (req, res) => {
  const sql = 'SELECT * FROM abogados WHERE ocupacion = Abogado';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json('Error interno del servidor');
    }
    return res.json(result);
  });
});

app.delete("/casos/:id", (req, res) => {
  const idCasos = req.params.id;
  const sql = "DELETE FROM Casos WHERE idCasos = ?";

  db.query(sql, [idCasos], (err, result) => {
    if (err) {
      console.error("Error al eliminar el caso: ", err);
      return res.status(500).json("Error interno del servidor");
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("El caso no existe");
    }

    return res.json("Caso eliminado exitosamente");
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
