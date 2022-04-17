const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller.js");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "delete",
  describe: "delete note from list",
  builder: {
    id: {
      type: "number",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: "list",
  describe: "print all notes",
  async handler() {
    printNotes();
  },
});

yargs.parse();
