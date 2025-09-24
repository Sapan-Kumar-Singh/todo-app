import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api-services";
import todoReducer from './todoSlice'


export const store=configureStore({
   reducer:{
      [api.reducerPath]:api.reducer,
      todoList:todoReducer
   },
   middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
})