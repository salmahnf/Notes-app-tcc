import React, { useEffect, useState } from "react";
import { getNotes, addNote, updateNoteContent, deleteNote } from "../api/notes";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #0d1b2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background: #c1121f;
  }
`;

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (title, content) => {
    try {
      await addNote(title, content);
      await fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (id, newTitle, newNotes) => {
    try {
      await updateNoteContent(id, newTitle, newNotes);
      await fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <PageContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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