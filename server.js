//istalled dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

let notes = [];
// //used middleware for app cross comuniction with servers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//get routs
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    return res.json(JSON.parse(data));
    if (err) {
      console.log(err);
    }
  });
});

//post routs
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  let newNote = JSON.stringify(req.body);
  notes.push(newNote);
  fs.writeFile("./db/db.json", `[${notes}]`, (err) => {
    if (err) throw err;
    return res.json(req.body);
  });
});
//code telling app to listen
app.listen(PORT, () => {

  console.log("Server listening on: http://localhost:" + PORT);
});
