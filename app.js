const yargs = require("yargs");
const notes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

// add, remove, read, list

// Create add command
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body content",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.add(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "remove a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.remove(argv.title);
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.read(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "list all notes",
  handler: () => {
    notes.list();
  },
});

yargs.parse();
