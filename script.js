let allNotes = {
  notesTitles: ["Ba", "Aufgabe"],
  notes: ["banane", "rasen mähen"],
  archivNotesTitles: [],
  archivNotes: [],
  trashNotesTitle: [],
  trashNotes: [],
};

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

function getArchiveNoteTemplate(index) {
  return `
      <p>
          + ${allNotes.archivNotesTitles[index]} -> ${allNotes.archivNotes[index]}
          <div class="button-group">
              <button onclick="restoreFromArchive(${index})" class="restore-btn">📤</button>
              <button onclick="archiveToTrash(${index})" class="delete-btn">🗑️</button>
          </div>
      </p>`;
}

function getTrashNoteTemplate(index) {
  return `
      <p>
          + ${allNotes.trashNotesTitle[index]} -> ${allNotes.trashNotes[index]}
          <div class="button-group">
              <button onclick="restoreFromTrash(${index})" class="restore-btn">↩️</button>
              <button onclick="deleteNote(${index})" class="delete-btn">❌</button>
          </div>
      </p>`;
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
