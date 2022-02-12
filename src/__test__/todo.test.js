import "regenerator-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TodoTask from "../components/TodoTask";
import AddTodo from "../components/AddTodo";
import axios from "axios";
import { fetchTodos, URL } from "../utils";

jest.mock("axios")

const dummyData = {
  description: "test desc",
  deadline: 5,
};

describe("todo", () => {
  it("should task name is 'test desc' ", () => {
    render(<TodoTask task={dummyData} />);
    expect(screen.getByText(/test desc/i)).toBeInTheDocument;
  });
  it("should deadline is '5' ", () => {
    render(<TodoTask task={dummyData} />);
    expect(screen.getByText(/5/i)).toBeInTheDocument;
  });
});

describe("add todo", () => {
  it("call onSubmit function", async () => {
    const mockOnSubmit = jest.fn()
    render(<AddTodo handleSubmit={mockOnSubmit} setDesc={mockOnSubmit} setDeadline={mockOnSubmit}/>)

    await act(async () => {
      fireEvent.change(screen.getByLabelText("description"),{target:{ value: "todo app" }})
      fireEvent.change(screen.getByLabelText("deadline"),{target:{ value: 3 }})
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /save/i }))
    })
    expect(mockOnSubmit).toHaveBeenCalled()
  })
});

describe("clear input", () => {
  it("shoukd input desc dan deadline null if button clear called", async () => {
    const mock = jest.fn()
    render(<AddTodo handleReset={mock} desc={mock} deadline={mock} setDesc={mock} setDeadline={mock}/>)

    await act(async () => {
      fireEvent.change(screen.getByLabelText("description"),{target:{ value: "todo app" }})
      fireEvent.change(screen.getByLabelText("deadline"),{target:{ value: 3 }})
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /clear/i }))
    })
    expect(mock).toHaveBeenCalled()
    expect(screen.getByRole('textbox').nodeValue).toBeNull();
    expect(screen.getByRole('spinbutton').nodeValue).toBeNull();
  })
})

describe("fetching todos", () => {
  describe("when API call is successfull", () => {
    it("should return todos list", async () => {
      const todos = [
        {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          // completed: false
        },
        {
          userId: 1,
          id: 2,
          title: "quis ut nam facilis et officia qui",
          // completed: false
        },
      ];
      axios.get.mockResolvedValueOnce(todos);

      const result = await fetchTodos();
      expect(axios.get).toHaveBeenCalledWith(`${URL}/users/1/todos`);
      expect(result).toEqual(todos)
    })
  })
  
  describe('when API call fail', () => {
    it("should return empty todos list", async () => {
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      const result = await fetchTodos();

      expect(axios.get).toHaveBeenCalledWith(`${URL}/users/1/todos`);
      expect(result).toEqual({})
    })
  })
})