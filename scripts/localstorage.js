function getFromLocalStorage() {
  const storedNotes = JSON.parse(localStorage.getItem("allNotes"));
  if (storedNotes) {
    allNotes = storedNotes;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
}

