// Obtener elementos del DOM
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteList = document.getElementById("note-list");

// Manejar el almacenamiento de notas en el navegador
let notes = [];

function addNote() {
  const noteText = noteInput.value;
  if (noteText) {
    const note = {
      id: Date.now(),
      text: noteText,
    };
    notes.push(note);
    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    renderNotes();
  }
}

function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="note-text">${note.text}</span>
      <span class="note-actions">
        <button onclick="deleteNote(${note.id})">Eliminar</button>
      </span>
    `;
    noteList.appendChild(li);
  });
}

// Manejar el envío del formulario
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Cargar las notas guardadas al cargar la página
loadNotes();
