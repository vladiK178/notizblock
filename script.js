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
  renderArchiveNotes();
  renderTrashNotes();
}

function getFromLocalStorage() {
  const storedNotes = JSON.parse(localStorage.getItem("allNotes"));
  if (storedNotes) {
    allNotes = storedNotes;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let i = 0; i < allNotes.notes.length; i++) {
    contentRef.innerHTML += getNoteTemplate(i);
  }
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive_content");
  archiveContentRef.innerHTML = "";

  for (let i = 0; i < allNotes.archivNotes.length; i++) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(i);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash_content");
  trashContentRef.innerHTML = "";

  for (let i = 0; i < allNotes.trashNotes.length; i++) {
    trashContentRef.innerHTML += getTrashNoteTemplate(i);
  }
}

function getNoteTemplate(index) {
  return `
      <p>
          + ${allNotes.notesTitles[index]} -> ${allNotes.notes[index]}
          <div class="button-group">
              <button onclick="noteToArchive(${index})" class="archive-btn">📁</button>
              <button onclick="noteToTrash(${index})" class="delete-btn">🗑️</button>
          </div>
      </p>`;
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
    allNotes.notesTitles.push(titleInputRef.value);
    allNotes.notes.push(noteInputRef.value);

    saveToLocalStorage();
    renderNotes();

    titleInputRef.value = "";
    noteInputRef.value = "";
  }
}

function noteToArchive(index) {
  allNotes.archivNotes.push(allNotes.notes[index]);
  allNotes.archivNotesTitles.push(allNotes.notesTitles[index]);

  allNotes.notes.splice(index, 1);
  allNotes.notesTitles.splice(index, 1);

  saveToLocalStorage();
  renderNotes();
  renderArchiveNotes();
}

function restoreFromArchive(index) {
  allNotes.notes.push(allNotes.archivNotes[index]);
  allNotes.notesTitles.push(allNotes.archivNotesTitles[index]);

  allNotes.archivNotes.splice(index, 1);
  allNotes.archivNotesTitles.splice(index, 1);

  saveToLocalStorage();
  renderNotes();
  renderArchiveNotes();
}

function archiveToTrash(index) {
  allNotes.trashNotes.push(allNotes.archivNotes[index]);
  allNotes.trashNotesTitle.push(allNotes.archivNotesTitles[index]);

  allNotes.archivNotes.splice(index, 1);
  allNotes.archivNotesTitles.splice(index, 1);

  saveToLocalStorage();
  renderArchiveNotes();
  renderTrashNotes();
}

function noteToTrash(index) {
  allNotes.trashNotes.push(allNotes.notes[index]);
  allNotes.trashNotesTitle.push(allNotes.notesTitles[index]);

  allNotes.notes.splice(index, 1);
  allNotes.notesTitles.splice(index, 1);

  saveToLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function restoreFromTrash(index) {
  allNotes.notes.push(allNotes.trashNotes[index]);
  allNotes.notesTitles.push(allNotes.trashNotesTitle[index]);

  allNotes.trashNotes.splice(index, 1);
  allNotes.trashNotesTitle.splice(index, 1);

  saveToLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function deleteNote(index) {
  allNotes.trashNotes.splice(index, 1);
  allNotes.trashNotesTitle.splice(index, 1);

  saveToLocalStorage();
  renderTrashNotes();
}
