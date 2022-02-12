import React, { FC } from "react";

interface AddTodoITF {
  desc: string;
  deadline: number;
  setDesc(value: React.SetStateAction<string>): void;
  setDeadline(value: React.SetStateAction<number>): void;
  handleSubmit(): void;
  handleReset(): void;
}

const AddTodo: FC<AddTodoITF> = ({
  desc,
  deadline,
  setDesc,
  setDeadline,
  handleSubmit,
  handleReset,
}) => {
  return (
    <div className="content">
      <div className="wrapInput">
        <label htmlFor="description" aria-labelledby="description">description</label>
        <input
          className="input"
          type="text"
          name="description"
          id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="deadline" aria-labelledby="deadline">deadline</label>
        <input
          className="input"
          type="number"
          placeholder="Deadline (in Days)..."
          name="deadline"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(Number(e.target.value))}
        />
      </div>
      <div className="wrapBtn">
        <button className="btn-save" type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn-clear" onClick={handleReset}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
