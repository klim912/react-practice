import Task from "./components/Task";

function App() {
  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <Task 
        title="Проект на React" 
        description="Створити та налаштувати новий React проект за допомогою Vite" 
        initialCompleted={false} 
      />
      <Task 
        title="Налаштування Tailwind" 
        description="Додати Tailwind CSS до проекту" 
        initialCompleted={false} 
      />
    </div>
  );
}

export default App;
