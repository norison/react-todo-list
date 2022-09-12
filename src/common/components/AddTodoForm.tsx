import React from "react";
import CreateTodo from "../../features/todos/models/CreateTodo";

interface AddTodoFormProps {
  onSubmit: (createTodo: CreateTodo) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const sumbmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const createTodo: CreateTodo = {
      title,
      description,
    };

    onSubmit(createTodo);
  };

  return (
    <form onSubmit={sumbmitHandler}>
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
