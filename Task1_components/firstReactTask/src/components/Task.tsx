import { useState } from "react";

type TaskProps = {
  title: string;
  description: string;
  initialCompleted?: boolean;
};

const Task: React.FC<TaskProps> = ({ title, description, initialCompleted = false }) => {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  return (
    <div
      className={`p-4 border rounded-lg shadow-md transition-all ${
        isCompleted ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
      }`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      
      <label className="flex items-center mt-2 space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          className="w-5 h-5 accent-green-500"
        />
        <span
          className={`text-sm font-semibold ${
            isCompleted ? "text-green-700" : "text-red-700"
          }`}
        >
          {isCompleted ? "Виконано" : "Не виконано"}
        </span>
      </label>
    </div>
  );
};

export default Task;
