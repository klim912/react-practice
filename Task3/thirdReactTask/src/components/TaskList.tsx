import { useState } from "react";
import Task from "./Task";

type TaskItem = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: "React Project", description: "Створити новий React проект з Vite", isCompleted: false },
    { id: 2, title: "Tailwind Setup", description: "Додати Tailwind CSS до проекту", isCompleted: false },
    { id: 3, title: "Create Components", description: "За допомогою React створити перевикористовувані компоненти", isCompleted: false },
  ]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title, description, isCompleted: false }]);
    setTitle("");
    setDescription("");
    setIsAddPopupOpen(false);
  };

  const deleteTaskByTitle = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.title.toLowerCase() !== deleteTitle.toLowerCase()));
    setDeleteTitle("");
    setIsDeletePopupOpen(false);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">📋 Task List</h1>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <Task title={task.title} description={task.description} isCompleted={task.isCompleted} />
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`w-40 ml-4 px-6 py-2 font-semibold text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 ${
                task.isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {task.isCompleted ? "Не виконано" : "Виконано"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setIsAddPopupOpen(true)}
          className="px-6 py-2 font-semibold text-white rounded-xl shadow-lg  bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Додати таску
        </button>
        <button
          onClick={() => setIsDeletePopupOpen(true)}
          className="px-6 py-2 font-semibold text-white rounded-xl shadow-lg bg-red-600 hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Видалити таску
        </button>
      </div>

      {isAddPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative animate-fadeIn">
            <button
              onClick={() => setIsAddPopupOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📝 Нова задача</h2>
            <form onSubmit={addTask} className="space-y-4">
              <input
                type="text"
                placeholder="Назва задачі"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Опис задачі"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all duration-300 cursor-pointer"
              >
                Додати задачу
              </button>
            </form>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative animate-fadeIn">
            <button
              onClick={() => setIsDeletePopupOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Введіть назву задачі, яку треба видалити</h2>
            <input
              type="text"
              value={deleteTitle}
              onChange={(e) => setDeleteTitle(e.target.value)}
              placeholder="Введіть назву..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
            />
            <div className="mt-4 flex justify-between">
            
              <button
                onClick={deleteTaskByTitle}
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all cursor-pointer"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
