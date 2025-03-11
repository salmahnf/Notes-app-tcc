const API_URL = "http://localhost:5000";

// Ambil semua catatan dari backend
export const getNotes = async () => {
  const response = await fetch(`${API_URL}/notes`); // Ambil data dari /notes
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

// Tambah catatan baru
export const addNote = async (title, content) => {
  const response = await fetch(`${API_URL}/tambahNotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, notes: content }),
  });

  if (!response.ok) {
    throw new Error("Failed to add note");
  }

  return response.json(); // API mengembalikan catatan yang baru dibuat
};

// Update status catatan (ubah selesai atau belum selesai)
export const updateNoteContent = async (id, title, content) => {
  const response = await fetch(`${API_URL}/edit-notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, notes: content }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note content");
  }

  return response.json();
};

// Hapus catatan berdasarkan ID
export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/delete-notes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
};
