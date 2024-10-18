import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const loadFromLocalStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return [];
  }
};

const saveToLocalStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

const initialState: TodoState = {
  todos: loadFromLocalStorage(),
};

export const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
      saveToLocalStorage(state.todos);
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },

    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        saveToLocalStorage(state.todos);
      }
    },

    toggleTodoCompletion: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.todos);
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleTodoCompletion } =
  TodoSlice.actions;

export default TodoSlice.reducer;
