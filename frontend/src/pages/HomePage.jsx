import { useEffect, useState } from "react";
import { getNotes, addNote, updateNoteContent, deleteNote } from "../api/notes";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #0d1b2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []); // Setiap `refresh` berubah, panggil `fetchNotes()`

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleAddNote = async (title, content) => {
    try {
      await addNote(title, content);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (id, newTitle, newNotes) => {
    try {
      await updateNoteContent(id, newTitle, newNotes);
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <PageContainer>
      <NoteForm onAdd={handleAddNote} />
      <NotesList
        notes={notes}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />
    </PageContainer>
  );
};

export default HomePage;
