import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TodoList from "../../../common/components/TodoList";
import { deleteTodoAsync, fetchAllTodosAsync } from "../todosSlice";

export default function TodoListView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todosReducer.todos);

  React.useEffect(() => {
    dispatch(fetchAllTodosAsync());
  }, [dispatch]);

  const onDelete = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <>
      <TodoList todos={todos} onDelete={onDelete} />
      <div>
        <button onClick={() => navigate("/add")}>Add todo</button>
      </div>
    </>
  );
}
