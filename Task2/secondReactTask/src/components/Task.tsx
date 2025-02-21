type TaskProps = {
    title: string;
    description: string;
    isCompleted: boolean;
  };
  
  const Task: React.FC<TaskProps> = ({ title, description, isCompleted }) => {
    return (
      <div
        className={`relative w-2xl mr-3 p-6 rounded-xl shadow-lg transition-all duration-500 border-l-8 ${
          isCompleted ? "bg-gradient-to-r from-green-100 to-green-200 border-green-500" : "bg-gradient-to-r from-red-100 to-red-200 border-red-500"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-700 mt-2">{description}</p>

        <span
          className={`absolute top-1 right-1 px-3 py-1 text-sm font-semibold rounded-full transition-all duration-300 ${
            isCompleted ? "bg-green-500 text-black shadow-md" : "bg-red-500 text-white shadow-md"
          }`}
        >
          {isCompleted ? "Виконано" : "Не виконано"}
        </span>
      </div>
    );
  };
  
  export default Task;
  