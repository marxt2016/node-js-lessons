const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title: title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.greenBright("Note was added"));
}
async function removeNote(id) {
  const notes = await getNotes();

  const updatedNotes = notes.filter((note) => note.id !== id.toString());

  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
  console.log(chalk.cyanBright(`Note with ${id} was deleted.`));
}

async function updateNote(id, newValue) {
  const notes = await getNotes();
  const updatedNotes = notes.map((note) => (note.id === id.toString() ? { id: note.id, title: newValue } : { id: note.id, title: note.title }));
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
  console.log(chalk.cyanBright(`Note with ${id} was updated.`));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlueBright("List of notes"));
  notes.forEach((note) => {
    console.log(chalk.blueBright(note.id, note.title));
  });
}
module.exports = { addNote, getNotes, removeNote, updateNote };
