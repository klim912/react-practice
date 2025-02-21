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
    {
      id: 1,
      title: "React Project",
      description: "Створити новий React проект з Vite",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Tailwind Setup",
      description: "Додати Tailwind CSS до проекту",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Create Components",
      description: "За допомогою React компоненти які можна перевикористовувати",
      isCompleted: false,
    },
  ]);

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Task List
      </h1>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Task
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
            />
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
    </div>
  );
};

export default TaskList;
