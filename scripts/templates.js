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
