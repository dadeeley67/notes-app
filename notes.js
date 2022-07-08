const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  debugger;

  if (duplicateNotes.length === 0) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green.inverse("new note added titled " + title));
  } else {
    console.log(chalk.red.inverse("note already exists"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const savedNotes = notes.filter((note) => note.title !== title);

  if (savedNotes.length === notes.length) {
    console.log(chalk.red.inverse("no note with title " + title + " found."));
  } else {
    saveNotes(savedNotes);
    console.log(chalk.green.inverse("removed note titled " + title));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.filter((note) => note.title === title);

  if (noteToRead.length > 0) {
    console.log(chalk.green.inverse(title));
    console.log(noteToRead[0].body);
  } else {
    console.log(chalk.red.inverse("Note titled " + title + " was not found."));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("All of your notes: "));
  notes.forEach((note) => {
    console.log(chalk.blue.inverse(note.title));
  });
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  try {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  add: addNote,
  remove: removeNote,
  read: readNote,
  list: listNotes,
};
