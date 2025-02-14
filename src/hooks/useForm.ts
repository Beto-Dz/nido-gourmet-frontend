import { useEffect, useMemo, useState, ChangeEvent } from "react";

// Definir los tipos para el estado del formulario y las validaciones
type FormState = Record<string, string>;
type FormValidations = Record<string, (value: string) => boolean>;

// Definir el tipo para el estado de las validaciones
type FormValidationState = Record<string, boolean>;

// Tipo de retorno del hook
type UseFormReturn<T extends FormState> = T & {
  [key: string]: any; // Para propiedades dinámicas como `emailValid`, `passwordValid`
} & {
  formObject: T;
  handleOnInputChange: <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => void;
  isValidForm: boolean;
};

export const useForm = <T extends FormState>(
  initialForm: T = {} as T,
  formValidations: FormValidations = {}
): UseFormReturn<T> => {
  // estado de formulario
  const [formState, setFormState] = useState<T>(initialForm);

  // estado para las validaciones
  const [formValidation, setFormValidation] = useState<FormValidationState>({});

  useEffect(() => {
    const objeto: FormValidationState = {};
    Object.keys(formValidations).forEach((key) => {
      objeto[`${key}Valid`] = formValidations[key]?.(formState[key]);
    });
    setFormValidation(objeto);
  }, [formState, formValidations]);

  // funcion para saber si el formulario está listo para ser enviado al backend
  const isValidForm = useMemo(() => {
    const isValid = Object.keys(formValidations).map(
      (key) => formValidation[`${key}Valid`]
    );
    return isValid.every((value) => value);
  }, [formValidation, formValidations]);

  // cuando cambie el formulario
  const handleOnInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>({
    target,
  }: ChangeEvent<T>) => {
    // desestructurando
    const { name, value } = target;
    // actualizando el estado del formulario
    setFormState({ ...formState, [name]: value });
    // Obtener la validación dinámica para el campo
    const isValid = formValidations[name]?.(value);
    setFormValidation({ ...formValidation, [`${name}Valid`]: isValid });
  };

  // Retornar el objeto con las propiedades dinámicas y fijas
  return {
    ...formState,
    ...formValidation,
    formObject: formState,
    handleOnInputChange,
    isValidForm,
  } as UseFormReturn<T>;
};