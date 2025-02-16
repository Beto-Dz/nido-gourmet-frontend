import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../store";

// Crear un useSelector tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;