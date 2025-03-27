import { useState } from "react";
import { Link } from "react-router";
import { patterns } from "../../utilitys";
import { useAuthSlice, useForm } from "../../hooks";
import { InputField, InputFieldPassword } from "../../components";

// obteniendo el patron de correo
const { email: emailP } = patterns;

// objeto con funciones de validacion
const formValidations = {
  email: (value: string): boolean => value.length >= 9 && emailP.js.test(value),
  password: (value: string): boolean => value.length >= 5,
};

export const Login = () => {

  // uso de custom hook para manejar la autenticacion
  const { status, handleStartLogin } = useAuthSlice();

  // estado para formulario
  const { email, password, emailValid, passwordValid, handleOnInputChange, formObject, isValidForm, } 
    = useForm({ email: "", password: "" }, formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isValidForm) return;

    // TODO: manejar respuesta
    console.log(formObject)

    handleStartLogin(email, password);
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleOnSubmit} >
      <InputField type="email" name="email" label="Correo electrónico" value={email} onChange={handleOnInputChange} pattern={emailP.html} 
        placeholder="ejemplo@00.com" isValid={!emailValid && formSubmitted} description="Ingresa tu correo" minLength={9}
      />

      <InputFieldPassword label="Contraseña" value={password} onChange={handleOnInputChange} placeholder="**********" isValid={!passwordValid && formSubmitted}
        description="Ingresa tu contraseña" minLength={5}
      />

      <Link to="/auth/register" className="text-sm text-twine-500" >
        ¿No tienes una cuenta?. ¡Registrate aquí!.
      </Link>

      <button type="submit" disabled={status === 'checking'} className="bg-twine-500 text-white self-center disabled:bg-twine-100 hover:bg-twine-600 transition-all ease-in-out" >
        Ingresar
      </button>
    </form>
  );
};
