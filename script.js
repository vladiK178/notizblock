let notes = ["banane", "rasen mähen"];

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
function getNoteTemplate(indexNote) {
  return `<p>+ ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">X</button></p>`;
}

//notizen hinzufügen
function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value; //eingabe auslesen

  notes.push(noteInput); //eingabe den notizen hinzufügen
  renderNotes(); //eingabe anzeigen lassen

  noteInputRef.value = "";
}

//notizen löschen
function deleteNote(indexNote) {
  notes.splice(indexNote, 1); //notizen löschen
  renderNotes(); // anzeige updaten
}
