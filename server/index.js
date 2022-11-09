const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rahul",
  database: "react_crud",
  port: 3308,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM product_db";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, price, description, category } = req.body;
  const sqlInsert =
    "INSERT INTO product_db (name, price, description, category) VALUES (?,?,?,?)";
  db.query(sqlInsert, [name, price, description, category], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM product_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM product_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  const sqlUpdate =
    "UPDATE product_db SET name = ?, price = ?, description = ?, category = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [name, price, description, category, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO product_db (name, price, description, category) VALUES ('Abercrombie Allen Anew Shirt 1','500','Awesome 1 new shirt','Fashion')";
  //   db.query(sqlInsert, (err, result) => {
  //     console.log("error", err);
  //     console.log("result", result);
  //   });
  //   res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
