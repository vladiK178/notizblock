let notesTitles = ["Ba", "Aufgabe"];
let notes = ["banane", "rasen mähen"];

let trashNotesTitle = [];
let trashNotes = [];

//wann werden die Notizen angezeigt -> beim laden der Seite (onload)
function renderNotes() {
  let contentRef = document.getElementById("content"); //wo werden die Notizen angezeigt
  contentRef.innerHTML = ""; //leer lassen

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    // for (const indexNote of notes) {                                 <--- //alternativ
    // contentRef.innerHTML += getNoteTemplate(indexNote);
    // }
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashcontentRef = document.getElementById("trash_content"); //wo werden die Notizen angezeigt
  trashcontentRef.innerHTML = ""; //leer lassen

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashcontentRef.innerHTML += getNoteTemplate(indexTrashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `<p>+ ${notesTitles[indexNote]} -> ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ ${trashNotesTitle[indexTrashNote]} -> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`;
}

//notizen hinzufügen
function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value; //eingabe auslesen

  notes.push(noteInput); //eingabe den notizen hinzufügen
  renderNotes(); //eingabe anzeigen lassen

  noteInputRef.value = "";
}

function notetoTrash(indexNote) {
  let trashNote = notes.splice(indexNote, 1); //notizen löschen
  trashNotes.push(trashNote[0]);
  let trashNoteTitle = notesTitles.splice(indexNote, 1); //notizen löschen
  trashNotesTitle.push(trashNoteTitle[0]);

  renderNotes(); // anzeige updaten
  renderTrashNotes();
}

//notizen löschen
function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1); //notizen löschen
  renderNotes(); // anzeige updaten
  renderTrashNotes();
}
