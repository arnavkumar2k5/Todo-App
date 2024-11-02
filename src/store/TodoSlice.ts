import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../utils/firebase";
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: true,
  error: null,
};

const addTodoToFirestore = async (text: string, completed: boolean) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), { text, completed });
    return { id: docRef.id, text, completed };
  } catch (error) {
    console.error("Error adding todo to Firestore:", error);
    return null;
  }
};

const removeTodoFromFirestore = async (id: string) => {
  try {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error("Error removing todo from Firestore:", error);
  }
};

const editTodoInFirestore = async (id: string, text: string) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { text });
  } catch (error) {
    console.error("Error updating todo in Firestore:", error);
  }
};

const toggleTodoCompletionInFirestore = async (id: string, completed: boolean) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed });
  } catch (error) {
    console.error("Error toggling completion in Firestore:", error);
  }
};

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    const todo = await addTodoToFirestore(text, false);
    return todo;
  }
);

export const loadTodosFromFirestore = createAsyncThunk(
  "todos/loadTodosFromFirestore",
  async () => {
    const todosSnapshot = await getDocs(collection(db, "todos"));
    return todosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];
  }
);

export const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState,
  reducers: {
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      removeTodoFromFirestore(action.payload);
    },

    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        editTodoInFirestore(id, text);
      }
    },

    toggleTodoCompletion: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        toggleTodoCompletionInFirestore(action.payload, todo.completed);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodosFromFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodosFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodosFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load todos";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload) {
          state.todos.push(action.payload);
        }
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add todo";
      });
  },
});

export const { removeTodo, editTodo, toggleTodoCompletion } = TodoSlice.actions;

export default TodoSlice.reducer;
