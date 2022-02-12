import React, { FC, useState } from "react";
import { Tasks } from "./interfaces";
import "./index.css";
import TodoTask from "./components/TodoTask";
import AddTodo from "./components/AddTodo";

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
      <AddTodo
        desc={desc}
        deadline={deadline}
        setDesc={setDesc}
        setDeadline={setDeadline}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
      <div className="todoList">
        {taskList.map((task: Tasks, key: number) => (
          <TodoTask key={key} task={task} completeTask={handleCompletedTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
