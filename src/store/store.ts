import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/AuthSlice";
import { UiSlice } from "./ui/UiSlice";

// Definir el tipo del estado global
// ReturnType retorna un tipado
// getStatet es una funcion que lee el arbol de slices del store
// typeof indica el tipado de getStatet
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: UiSlice.reducer,
  },
});
