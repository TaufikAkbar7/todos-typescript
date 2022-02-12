import React, { FC } from "react";
import { Tasks } from "../interfaces";
// import "../index.css";

interface Task {
  task: Tasks;
  completeTask(taskName: string): void;
}

const TodoTask: FC<Task> = ({ task, completeTask }) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.description}</span>
        <span>{task.deadline}</span>
      </div>
      <button onClick={() => completeTask(task.description)}>X</button>
    </div>
  );
};

export default TodoTask;
