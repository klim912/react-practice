import React from "react";
import { Note } from "./NotesManager";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  editNote: (
    id: number,
    newTitle: string,
    newText: string,
    newCategory: string
  ) => void;
  deleteNote: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  editNote,
  deleteNote,
}) => {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
