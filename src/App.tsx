import React, { FC, useState } from "react";
import { Tasks } from "./interfaces";
import "./index.css";
import TodoTask from "./components/TodoTask";

const App: FC = () => {
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [taskList, setTaskList] = useState<Tasks[]>([]);

  const handleSubmit = (): void => {
    const newTask = {
      description: desc,
      deadline: deadline,
    };
    setTaskList([...taskList, newTask]);
    setDesc("");
    setDeadline(0);
  };

  const handleCompletedTask = (taskName: string) => {
    setTaskList(taskList.filter((item) => item.description !== taskName));
  };

  const handleReset = () => {
    setDesc("");
    setDeadline(0);
  }

  return (
    <div className="wrap">
      <div className="content">
        <div className="wrapInput">
          <p>Description:</p>
          <input
            className="input"
            type="text"
            name="description"
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(Number(e.target.value))}
          />
        </div>
        <div className="wrapBtn">
          <button className="btn-save" type="submit" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn-clear" onClick={handleReset}>Clear</button>
        </div>
      </div>
      <div className="todoList">
        {taskList.map((task: Tasks, key: number) => (
          <TodoTask key={key} task={task} completeTask={handleCompletedTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
