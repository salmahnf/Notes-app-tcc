import NoteCard from "./NoteCard";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Title = styled.h2`
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  background:  #0d1b2a;
`;


const NotesList = ({ notes, onUpdate, onDelete }) => {
  return (
    <>
    <Title>📖 All Notes 📖</Title>
    <ListContainer>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          notes={note.notes}
          updated_at={note.updated_at}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ListContainer>
    </>
  );
};

export default NotesList;
