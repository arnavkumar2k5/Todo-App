import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './TodoSlice';
import AuthReducer from './AuthSlice'

const store = configureStore({
  reducer: {
    todos: TodoReducer,
    auth: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
