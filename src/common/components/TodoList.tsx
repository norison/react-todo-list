import Todo from "../../features/todos/models/Todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
