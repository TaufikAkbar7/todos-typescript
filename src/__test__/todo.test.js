import "regenerator-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TodoTask from "../components/TodoTask";
import AddTodo from "../components/AddTodo";

const dummyData = {
  description: "test desc",
  deadline: 5,
};

describe("todo", () => {
  it("seharusnya task name itu 'test desc' ", () => {
    render(<TodoTask task={dummyData} />);
    expect(screen.getByText(/test desc/i)).toBeInTheDocument;
  });
  it("seharusnya task name itu 'test desc' ", () => {
    render(<TodoTask task={dummyData} />);
    expect(screen.getByText(/5/i)).toBeInTheDocument;
  });
});

describe("add todo", () => {
  it("panggil onSubmit function", async () => {
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
  it("seharusnya input desc dan deadline kosong jika button clear di jalankan", async () => {
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
