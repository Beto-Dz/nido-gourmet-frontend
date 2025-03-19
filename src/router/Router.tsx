import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LandingPage, Login, Register, Layout, Loader, Home, Devices, Profile } from "../pages";
import { useAuthSlice } from "../hooks";
import { useEffect } from "react";
import { LayoutApp } from "../pages/app/LayoutApp";

export const Router = () => {
  // Obteniendo el estado de la autenticación para establecer rutas públicas y privadas
  const { status, checkAuthToken } = useAuthSlice();

  // Cuando se carga el router
  useEffect(() => {
    // Checkea si hay un token
    checkAuthToken();
  }, [status]);

  if (status === "checking") {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta inicial */}
        <Route index element={<LandingPage />} />
        {status !== "authenticated" ? (
          // Rutas de auth
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
            {/* Rutas perdidas */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Route>
        ) : (
          // Rutas de app cuando se está autenticado
          <Route path="nido">
            <Route
              index
              element={
                <LayoutApp>
                  <Home />
                </LayoutApp>
              }
            />
            <Route
              path="dispositivos"
              element={
                <LayoutApp>
                  <Devices />
                </LayoutApp>
              }
            />
            <Route
              path="perfil"
              element={
                <LayoutApp>
                  <Profile />
                </LayoutApp>
              }
            />
            {/* Rutas perdidas */}
            <Route path="*" element={<Navigate to="/nido" />} />
          </Route>
        )}
        {/* Rutas perdidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
