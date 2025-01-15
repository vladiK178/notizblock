let notesTitles = ["Ba", "Aufgabe"];
let notes = ["banane", "rasen mähen"];
let trashNotesTitle = [];
let trashNotes = [];

function init() {
  getFromLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function getFromLocalStorage() {
  let storedNotesTitles = JSON.parse(localStorage.getItem("notesTitles"));
  let storedNotes = JSON.parse(localStorage.getItem("notes"));
  let storedTrashNotesTitle = JSON.parse(
    localStorage.getItem("trashNotesTitle")
  );
  let storedTrashNotes = JSON.parse(localStorage.getItem("trashNotes"));

  if (storedNotesTitles != null) notesTitles = storedNotesTitles;
  if (storedNotes != null) notes = storedNotes;
  if (storedTrashNotesTitle != null) trashNotesTitle = storedTrashNotesTitle;
  if (storedTrashNotes != null) trashNotes = storedTrashNotes;
}

function saveToLocalStorage() {
  localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("trashNotesTitle", JSON.stringify(trashNotesTitle));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashcontentRef = document.getElementById("trash_content");
  trashcontentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashcontentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `<p>+ ${notesTitles[indexNote]} -> ${notes[indexNote]}<button onclick="notetoTrash(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ ${trashNotesTitle[indexTrashNote]} -> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`;
}

function addNote() {
  let titleInputRef = document.getElementById("title_input");
  let noteInputRef = document.getElementById("note_input");

  if (titleInputRef.value != "" && noteInputRef.value != "") {
    notesTitles.push(titleInputRef.value);
    notes.push(noteInputRef.value);

    saveToLocalStorage();
    renderNotes();

    titleInputRef.value = "";
    noteInputRef.value = "";
  }
}

function notetoTrash(indexNote) {
  trashNotes.push(notes[indexNote]);
  trashNotesTitle.push(notesTitles[indexNote]);

  notes.splice(indexNote, 1);
  notesTitles.splice(indexNote, 1);

  saveToLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  trashNotesTitle.splice(indexTrashNote, 1);

  saveToLocalStorage();
  renderTrashNotes();
}
