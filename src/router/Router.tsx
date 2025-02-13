import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LandingPage, Login, Register, Layout } from "../pages";
import { App } from "../App";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ruta inicial */}
        <Route index element={<LandingPage />} />
        {/* rutas de auth */}
        <Route path="auth">
          <Route
            index
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          {/* rutas perdidas */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Route>
        <Route path="nido">
          <Route index element={<App />} />
          {/* rutas perdidas */}
          <Route path="*" element={<Navigate to="/nido" />} />
        </Route>
        {/* rutas perdidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
