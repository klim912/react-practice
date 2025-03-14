import { useState } from "react";
import NotesList from "./NotesList";
import AddNotePopup from "./AddNotePopup";
import { PlusSquare } from "react-feather";
import FilterPanel from "./FilterPanel";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";

export interface Note {
  id: number;
  title: string;
  text: string;
  category: string;
  createdAt: Date;
  status: number;
}

interface NotesManagerProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function NotesManager({ notes, setNotes, searchQuery }: NotesManagerProps) {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlightedStatus, setHighlightedStatus] = useState<1 | 2 | 3 | null>(
    null
  );
  const [dragging, setDragging] = useState<Note | null>(null);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(note.category);

    return matchesSearch && matchesCategory;
  });

  const addNote = (title: string, text: string, category: string) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    const newNote: Note = {
      id: maxId + 1,
      title,
      text,
      category,
      createdAt: new Date(),
      status: 1,
    };
    setNotes([...notes, newNote]);
  };

  const editNote = (
    id: number,
    newTitle: string,
    newText: string,
    newCategory: string
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: newTitle, text: newText, category: newCategory }
          : note
      )
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event: any) => {
    const draggedNote = notes.find(
      (note) => note.id === Number(event.active.id)
    );
    setDragging(draggedNote || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !dragging) return;

    const draggedNoteId = Number(active.id);
    const newStatus = Number(over.id);

    if (![1, 2, 3].includes(newStatus)) return;

    setNotes((prevNotes) => {
      return prevNotes.map((note) =>
        note.id === draggedNoteId ? { ...note, status: newStatus } : note
      );
    });

    setHighlightedStatus(null);
    setDragging(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const newHighlightedStatus = Number(event.over.id) as 1 | 2 | 3;
      setHighlightedStatus(newHighlightedStatus);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              id="1"
              className={`border rounded-xl p-5 shadow-xl transition-all flex flex-col ${
                highlightedStatus === 1
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 border-blue-500 shadow-2xl"
                  : "bg-white"
              }`}
              animate={{ scale: highlightedStatus === 1 ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2
                className={`text-2xl font-semibold mb-3 ${
                  highlightedStatus === 1 ? "text-white" : "text-gray-800"
                }`}
              >
                Нове
              </h2>
              <SortableContext
                items={notes.filter((n) => n.status === 1).map((n) => n.id)}
                strategy={verticalListSortingStrategy}
              >
                <NotesList
                  notes={filteredNotes.filter((n) => n.status === 1)}
                  editNote={editNote}
                  deleteNote={deleteNote}
                />
              </SortableContext>
            </motion.div>

            <motion.div
              id="2"
              className={`border rounded-xl p-5 shadow-xl transition-all flex flex-col ${
                highlightedStatus === 2
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 border-yellow-500 shadow-2xl"
                  : "bg-white"
              }`}
              animate={{ scale: highlightedStatus === 2 ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2
                className={`text-2xl font-semibold mb-3 ${
                  highlightedStatus === 2 ? "text-white" : "text-gray-800"
                }`}
              >
                В процесі
              </h2>
              <SortableContext
                items={notes.filter((n) => n.status === 2).map((n) => n.id)}
                strategy={verticalListSortingStrategy}
              >
                <NotesList
                  notes={filteredNotes.filter((n) => n.status === 2)}
                  editNote={editNote}
                  deleteNote={deleteNote}
                />
              </SortableContext>
            </motion.div>

            <motion.div
              id="3"
              className={`border rounded-xl p-5 shadow-xl transition-all flex flex-col ${
                highlightedStatus === 3
                  ? "bg-gradient-to-r from-green-400 to-green-600 border-green-500 shadow-2xl"
                  : "bg-white"
              }`}
              animate={{ scale: highlightedStatus === 3 ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <h2
                className={`text-2xl font-semibold mb-3 ${
                  highlightedStatus === 3 ? "text-white" : "text-gray-800"
                }`}
              >
                Виконано
              </h2>
              <SortableContext
                items={notes.filter((n) => n.status === 3).map((n) => n.id)}
                strategy={verticalListSortingStrategy}
              >
                <NotesList
                  notes={filteredNotes.filter((n) => n.status === 3)}
                  editNote={editNote}
                  deleteNote={deleteNote}
                />
              </SortableContext>
            </motion.div>
          </div>
        </DndContext>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={() => setIsAddPopupOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusSquare />
            <span>Додати нотатку</span>
          </motion.button>
        </div>

        {isAddPopupOpen && (
          <AddNotePopup
            addNote={addNote}
            closePopup={() => setIsAddPopupOpen(false)}
          />
        )}
      </div>

      <FilterPanel
        categories={["Робота", "Особисте", "Навчання", "Інше"]}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}

export default NotesManager;
