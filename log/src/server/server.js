import mysql from "mysql2";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "BDTauste22-23",
  database: "registroWEB",
  port: 3306,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("¡Conexión exitosa a la base de datos!");
});

app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al obtener los usuarios");
    } else {
      res.send(results);
    }
  });
});

app.post("/usuarios", (req, res) => {
  connection.query(
    "INSERT INTO usuarios SET ?",
    req.body,
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al insertar un usuario");
      } else {
        res.send(results);
        console.log("Usuario insertado correctamente");
      }
    }
  );
});


app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});