import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import AddTodoForm from "../../../common/components/AddTodoForm";
import CreateTodo from "../models/CreateTodo";
import { addTodoAsync } from "../todosSlice";

export default function AddTodoView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (createTodo: CreateTodo) => {
    dispatch(addTodoAsync(createTodo)).then(() => navigate("/"));
  };

  return (
    <>
      <div>Add Todo</div>
      <div>
        <AddTodoForm onSubmit={onSubmit} />
      </div>
    </>
  );
}
