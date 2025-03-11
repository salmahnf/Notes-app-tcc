import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";

const NoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    if (!title.trim() || !note.trim()) {
      setMessage("Title and Note cannot be empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      onAdd(title, note); // Langsung update state tanpa fetch ulang
      setMessage("Note created successfully!");
      setTitle("");
      setNote("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>📖 New Notes 📖</Title>
      <Input
        type="text"
        placeholder="Input Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Write your notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <CreateButton onClick={handleCreateNote} disabled={loading}>
        {loading ? "Creating..." : "Create"} <FaEdit />
      </CreateButton>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #0d1b2a;
  color: #e0e1dd;
  width: 100vw;
  min-height: 100vh;
  margin-top: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
`;

const CharCount = styled.span`
  font-size: 14px;
  align-self: flex-end;
  margin-right: 15%;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #e0e1dd;
  background: transparent;
  color: white;
  outline: none;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 50%;
  height: 200px;
  padding: 10px;
  border: 1px solid #e0e1dd;
  background: transparent;
  color: white;
  outline: none;
  border-radius: 5px;
`;

const CreateButton = styled.button`
  width: 52%;
  padding: 10px;
  background: transparent;
  color: white;
  border: 1px solid #e0e1dd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 16px;

  &:hover {
    background: #e0e1dd;
    color: black;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "green")};
`;

const AllNotes = styled.h3`
  margin-top: 20px;
  font-size: 18px;
`;

export default NoteForm;
