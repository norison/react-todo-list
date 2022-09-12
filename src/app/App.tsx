import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodoView from "../features/todos/components/AddTodoView";
import TodoListView from "../features/todos/components/TodoListView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListView />} />
        <Route path="/add" element={<AddTodoView />} />
      </Routes>
    </BrowserRouter>
  );
}
