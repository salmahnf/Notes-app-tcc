import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const Card = styled.div`
  background: #f5f5dc; /* Warna cream muda */
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  max-width: 280px;
  word-wrap: break-word;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Title = styled.h3`
  color: #2c3e50;
  font-size: 16px;
  font-weight: bold;
`;

const Notes = styled.p`
  color: #4a4a4a;
  font-size: 14px;
`;

const DateText = styled.p`
  color: #8b0000;
  font-size: 12px;
  font-style: italic;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;

  &:hover {
    color: red;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #2c3e50;
  border-radius: 5px;
`;

const NoteCard = ({ id, title, notes, updated_at, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newNotes, setNewNotes] = useState(notes);

  const handleSave = () => {
    onUpdate(id, newTitle, newNotes);
    setIsEditing(false);
  };

  return (
    <Card>
      <IconContainer>
        {isEditing ? (
          <IconButton onClick={handleSave}>
            <FaSave />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <FaEdit />
          </IconButton>
        )}
        <IconButton onClick={() => onDelete(id)}>
          <FaTrash />
        </IconButton>
      </IconContainer>

      {isEditing ? (
        <>
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <Input value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
        </>
      ) : (
        <>
          <Title>{title}</Title>
          <Notes>{notes}</Notes>
        </>
      )}

      <DateText>{new Date(updated_at).toLocaleString()}</DateText>
    </Card>
  );
};

export default NoteCard;
