import { useDispatch } from "react-redux";
import { useAppSelector } from "../";
import { setCheckingStatus, onLogin, onLogout } from "../../store";
import backendAPI from "../../api/backendAPI";
import { LoginResponse } from "../../interfaces/LoginResponse";
import { useNavigate } from "react-router";

export const useAuthSlice = () => {
  // obteniendo la procion de estado auth
  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  // obteniendo funcion para despchar acciones al slice
  const dispatch = useDispatch();

  // utilizando el hokk de router dom para redirigir según sea el caso
  const navigate = useNavigate();

  /**
   * Funcion de ayuda para inicializar el login de la app
   */
  const handleStartLogin = async (email: string, password: string) => {
    // setea el estatus en checking
    dispatch(setCheckingStatus());

    try {
      // haciendo petición al endpoint de login
      const { data } = await backendAPI.post<LoginResponse>("/auth/", {
        email,
        password,
      });

      // despachando funcion que altera el estado global
      // de inicio de sesion
      dispatch(onLogin(data.usuario));

      // guardando el token en el localStorage
      window.localStorage.setItem("x-token", data.token);

      // finalmente nos redirigimos al nido
      navigate('/nido', {replace: true});
    } catch (error) {
      console.log(error);
    }
  };

  // funcion para checkear el token, si no hay uno en el localStorage
  // cierra sesion, Si si hay uno entonces hace una peticion para obtener un nuevo JWT
  const checkAuthToken = async () => {
    const token = window.localStorage.getItem("x-token");

    // si no hay un token, disparamos el cierre de sesión
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await backendAPI.get<LoginResponse>("/auth/renew");
      // despachando funcion que altera el estado global
      // de inicio de sesion
      dispatch(onLogin(data.usuario));

      // guardando el token en el localStorage
      window.localStorage.setItem("x-token", data.token);
      dispatch(onLogin(data));
    } catch (error) {
      console.log(error);
      window.localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    user,
    status,
    errorMessage,
    handleStartLogin,
    checkAuthToken,
  };
};
