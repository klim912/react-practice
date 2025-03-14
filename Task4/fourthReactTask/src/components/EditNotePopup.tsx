import { useState } from "react";
import { Note } from "./NotesManager";
import { XCircle } from "react-feather";
import { motion } from "framer-motion";

interface EditNotePopupProps {
  isOpen: boolean;
  note: Note;
  editNote: (
    id: number,
    newTitle: string,
    newText: string,
    newCategory: string
  ) => void;
  closePopup: () => void;
}

const EditNotePopup: React.FC<EditNotePopupProps> = ({
  isOpen,
  note,
  editNote,
  closePopup,
}) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [category, setCategory] = useState(note.category);
  const [isChanged, setIsChanged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editNote(note.id, title, text, category);
    closePopup();
  };

  const handleReset = () => {
    setTitle(note.title);
    setText(note.text);
    setCategory(note.category);
    setIsChanged(false);
  };

  const handleClose = () => {
    if (isChanged) {
      if (
        confirm("Ви маєте незбережені зміни. Ви впевнені, що хочете закрити?")
      ) {
        closePopup();
      }
    } else {
      closePopup();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.8,
        rotate: isOpen ? 0 : -10,
      }}
      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
        rotate: { duration: 0.2 },
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
        className="bg-white p-6 rounded-xl shadow-xl w-96 relative animate-fadeIn"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
        >
          <XCircle />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title || "Редагувати нотатку"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Назва нотатки"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsChanged(true);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Опис нотатки"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsChanged(true);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setIsChanged(true);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Робота">Робота</option>
            <option value="Особисте">Особисте</option>
            <option value="Навчання">Навчання</option>
            <option value="Інше">Інше</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={!isChanged}
              className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 ${
                isChanged
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Зберегти зміни
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditNotePopup;
