import React, { useState } from "react";
import { Note } from "./NotesManager";
import { XCircle } from "react-feather";
import { motion } from "framer-motion";

interface AddNotePopupProps {
  note?: Note;
  addNote: (newTitle: string, newText: string, newCategory: string) => void;
  closePopup: () => void;
}

const AddNotePopup: React.FC<AddNotePopupProps> = ({
  note,
  addNote,
  closePopup,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note?.text || "");
  const [category, setCategory] = useState(note?.category || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNote(title, text, category);
    closePopup();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="fixed inset-0 flex items-center justify-center bg-gray-600/50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePopup();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96 relative"
      >
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
        >
          <XCircle />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Додати нотатку
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Назва нотатки"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Опис нотатки"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Робота">Робота</option>
            <option value="Особисте">Особисте</option>
            <option value="Навчання">Навчання</option>
            <option value="Інше">Інше</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Зберегти зміни
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddNotePopup;
