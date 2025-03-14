import { useState } from "react";
import EditNotePopup from "./EditNotePopup";
import InfoNotePopup from "./InfoNotePopup";
import { Note } from "./NotesManager";
import { Edit, Trash2 } from "react-feather";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

interface NoteCardProps {
  note: Note;
  editNote: (
    id: number,
    newTitle: string,
    newText: string,
    newCategory: string
  ) => void;
  deleteNote: (id: number) => void;
}

const categoryColors: Record<string, string> = {
  Інше: "bg-blue-100 text-blue-700",
  Особисте: "bg-green-100 text-green-700",
  Навчання: "bg-yellow-100 text-yellow-700",
  Робота: "bg-red-100 text-red-700",
};

const NoteCard: React.FC<NoteCardProps> = ({ note, editNote, deleteNote }) => {
  const {
    attributes,
    setNodeRef,
    transform,
    transition,
    listeners,
    isDragging,
  } = useSortable({ id: note.id });
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  return (
    <>
      <motion.div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.6 : 1,
          scale: isDragging ? 1.1 : 1,
          boxShadow: isDragging ? "0px 10px 20px rgba(0, 0, 0, 0.3)" : "none",
        }}
        className={`relative bg-white border-2 ${
          isDragging ? "border-blue-500" : "border-gray-300"
        } shadow-lg rounded-xl p-5 max-w-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
      >
        <span
          className={`absolute top-2 left-2 px-3 py-1 text-sm font-medium rounded-full ${
            categoryColors[note.category] || "bg-gray-200 text-gray-700"
          }`}
        >
          {note.category}
        </span>

        <div className="mt-5">
          <h1
            className="text-lg font-semibold text-gray-900 cursor-pointer truncate"
            onClick={() => setIsInfoPopupOpen(true)}
          >
            {note.title}
          </h1>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">{note.text}</p>
        </div>

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditPopupOpen(true);
            }}
            className="text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
            className="text-gray-600 hover:text-red-600 cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div
          {...attributes}
          {...listeners}
          className="mt-2 cursor-grab text-center text-gray-500 select-none"
        >
          ⠿ Перетягнути
        </div>
      </motion.div>

      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <EditNotePopup
            isOpen={true}
            note={note}
            editNote={editNote}
            closePopup={() => setIsEditPopupOpen(false)}
          />
        </div>
      )}

      {isInfoPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <InfoNotePopup
            note={note}
            closePopup={() => setIsInfoPopupOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default NoteCard;
