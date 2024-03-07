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
      res.status(500).send("Error al realizar la consulta a la base de datos");
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
app.delete("/usuarios", (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM usuarios WHERE id = ?`;

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al eliminar un producto");
    } else {
      if (results.affectedRows === 0) {
        res
          .status(404)
          .send({ message: `Producto con id ${id} no encontrado` });
      } else {
        res.status(200).send({ message: `Producto con id ${id} eliminado` });
      }
    }
  });
});
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});