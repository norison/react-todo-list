import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoadingStatus from "./models/enums/LoadingStatus";
import Todo from "./models/Todo";
import api from "../../api";
import { v4 as uuid } from "uuid";
import CreateTodo from "./models/CreateTodo";

interface TodosState {
  todos: Todo[];
  loadingStatus: LoadingStatus;
}

const initialState: TodosState = {
  todos: [],
  loadingStatus: LoadingStatus.Idle,
};

export const fetchAllTodosAsync = createAsyncThunk(
  "todos/fetchAll",
  async () => {
    const response = await api.get<Todo[]>("todos");
    return response.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/add",
  async (createTodo: CreateTodo) => {
    const todo: Todo = {
      id: uuid(),
      title: createTodo.title,
      description: createTodo.description,
      isCompleted: false,
    };

    await api.post("todos", todo);
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    await api.delete(`todos/${id}`);
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodosAsync.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchAllTodosAsync.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Idle;
        state.todos = action.payload;
      })
      .addCase(fetchAllTodosAsync.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(addTodoAsync.fulfilled, (state) => {
        state.loadingStatus = LoadingStatus.Idle;
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Idle;
        state.todos = state.todos.filter((todo) => todo.id != action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      });
  },
});

export default todosSlice.reducer;
