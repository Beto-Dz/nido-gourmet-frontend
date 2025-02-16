import { createSlice } from "@reduxjs/toolkit";

// definiendo el tipado de las propiedades de la porcion
interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: { id: string; name: string } | null;
  errorMessage: string | null;
}

// definiendo un objeto de tipo, con los valores iniciales de la app
const initialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

// creando la porcion del estado
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCheckingStatus: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = null;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setCheckingStatus, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions;
