import { createSlice } from "@reduxjs/toolkit";

// definiendo el tipado de las propiedades de la porcion
interface UiSliceTypes {
  darkMode: boolean;
}

// definiendo un objeto de tipo, con los valores iniciales de la app
const initialState: UiSliceTypes = {
  darkMode: false,
};

// creando la porcion del estado
export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeDarkMode } = UiSlice.actions;
