import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [value, setValue] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTask = () => {
    if (input.trim()) {
      setValue(true);
      setTasks((prev) => [...prev, input]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const taskCompleted = (index) => {
    setCompleted((prev) => [...prev, tasks[index]]);
    setTasks((prev) => prev.filter((_, i) => i !== index));
    if (tasks.length === 1) setValue(false); // If no tasks remain, setValue to false
  };

  const untick = (index) => {
    setTasks((prev) => [...prev, completed[index]]);
    setValue(true);
    setCompleted((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
    if (tasks.length === 1) setValue(false); // Check for last task
  };

  const deleteCompleteTask = (index) => {
    setCompleted((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-white mb-8">📋 My Tasks</h1>

      {/* Input Section */}
      <div className="flex items-center bg-gray-800 text-white rounded-md shadow-md w-11/12 max-w-lg">
        <input
          className="flex-1 bg-transparent p-4 outline-none placeholder-gray-400 text-lg"
          id="input"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 px-6 py-4 text-lg font-semibold hover:bg-blue-700 transition rounded-r-md"
        >
          Add
        </button>
      </div>

      {/* Tasks Section */}
      <div className="w-11/12 max-w-lg mt-8">
        {value ? (
          <div>
            <p className="text-xl font-semibold text-green-400 mb-4">To Do:</p>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 text-white p-4 mb-2 rounded-md shadow-sm"
              >
                <p
                  className="cursor-pointer hover:text-green-500 transition"
                  onClick={() => taskCompleted(index)}
                >
                  ✓
                </p>
                <p className="flex-1 text-left ml-4">{task}</p>
                <p
                  className="cursor-pointer hover:text-red-500 transition"
                  onClick={() => deleteTask(index)}
                >
                  𐄂
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No tasks defined</p>
        )}
      </div>

      {/* Completed Section */}
      <div className="w-11/12 max-w-lg mt-8">
        {completed.length > 0 && (
          <div>
            <p className="text-xl font-semibold text-blue-400 mb-4">
              Completed:
            </p>
            {completed.map((complete, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 text-white p-4 mb-2 rounded-md shadow-sm"
              >
                <p
                  className="cursor-pointer hover:text-yellow-500 transition"
                  onClick={() => untick(index)}
                >
                  ↺
                </p>
                <p className="flex-1 text-left ml-4">{complete}</p>
                <p
                  className="cursor-pointer hover:text-red-500 transition"
                  onClick={() => deleteCompleteTask(index)}
                >
                  𐄂
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
