import { Note } from "./NotesManager";
import { XCircle } from "react-feather";

interface InfoNotePopupProps {
  note: Note;
  closePopup: () => void;
}

const InfoNotePopup: React.FC<InfoNotePopupProps> = ({ note, closePopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600/30 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative animate-fadeIn">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
        >
          <XCircle />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {note.title}
        </h2>
        <div className="space-y-4">
          <p>Опис нотатки:</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            {note.text}
          </p>
          <p>Категорія:</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            {note.category}
          </p>
          <p>Дата створення:</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            {note.createdAt.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoNotePopup;
