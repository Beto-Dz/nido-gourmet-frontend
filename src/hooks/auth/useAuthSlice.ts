import { useDispatch } from "react-redux";
import { useAppSelector } from "../";
import { setCheckingStatus, onLogin, onLogout } from "../../store";

export const useAuthSlice = () => {
  // obteniendo la procion de estado auth
  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  // obteniendo funcion para despchar acciones al slice
  const dispatch = useDispatch();

  /**
   * Funcion de ayuda para inicializar el login de la app
   */
  const handleStartLogin = (email: string, password: string) => {
    // setea el estatus en checking
    dispatch(setCheckingStatus());

    // TODO peticion http al backend para logeo
    window.localStorage.setItem("token", `${email}${password}`);
    dispatch(onLogin({ id: "189129", name: "beto" }));
  };

  // funcion para checkear el token, si no hay uno en el localStorage
  // cierra sesion pero obtiene otro
  const checkAuthToken = async () => {
    const token = window.localStorage.getItem("token");

    console.log(`token: ${token}`);

    // Si no hay un token, disparamos el cierre de sesión
    if (!token) {
      dispatch(onLogout());
      return;
    }

    // Si hay un token, despachamos la acción de login
    dispatch(onLogin({ id: "189129", name: "beto" }));
  };

  return {
    user,
    status,
    errorMessage,
    handleStartLogin,
    checkAuthToken,
  };
};
