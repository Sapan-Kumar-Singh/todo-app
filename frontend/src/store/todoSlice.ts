import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    title:'',
    description:'',
    completed: 'N',
  } as Record<string, any>,
  reducers: {
    setTodoField: (state, action: PayloadAction<{ [key: string]: any }>) => {
      Object.assign(state, action.payload);
    },
    resetTodo: (state) => {
     state.title = '';
      state.description = '';
      state.completed = 'N';
    },
  },
});

export const { setTodoField, resetTodo } = todoSlice.actions;
export default todoSlice.reducer;
