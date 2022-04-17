const express = require("express");
const chalk = require("chalk");
const path = require("path");

const { addNote, getNotes, removeNote, updateNote } = require("./notes.controller");

const port = 3001;
const app = express();
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express Example Get",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express Example Post",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express Example Post",
    notes: await getNotes(),
    created: false,
  });
});

app.patch("/:id", async (req, res) => {
  await updateNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express Example Post",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.blueBright("Server is running on port:", port));
});
