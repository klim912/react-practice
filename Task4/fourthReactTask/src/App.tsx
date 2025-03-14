import { useState } from "react";
import Header from "./components/Header";
import NotesManager from "./components/NotesManager";
import { Note } from "./components/NotesManager";
import "./App.css";

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Закінчити проект",
      text: "Треба завершити React-застосунок до п’ятниці",
      category: "Робота",
      createdAt: new Date(),
      status: 1,
    },
    {
      id: 2,
      title: "Купити продукти",
      text: "Молоко, яйця, хліб, сир",
      category: "Особисте",
      createdAt: new Date(),
      status: 1,
    },
    {
      id: 3,
      title: "Вивчити TypeScript",
      text: "Розібратися з типізацією та інтерфейсами",
      category: "Навчання",
      createdAt: new Date(),
      status: 1,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NotesManager
        notes={notes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
