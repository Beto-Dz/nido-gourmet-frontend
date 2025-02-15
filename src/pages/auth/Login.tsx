import { useState } from "react";
import { Link } from "react-router";
import { patterns } from "../../utilitys";
import { useForm } from "../../hooks";
import { InputField, InputFieldPassword } from "../../components";

// obteniendo el patron de correo
const { email: emailP } = patterns;

// objeto con funciones de validacion
const formValidations = {
  email: (value: string): boolean => value.length >= 9 && emailP.js.test(value),
  password: (value: string): boolean => value.length >= 5,
};

export const Login = () => {
  // estado para formulario
  const { email, password, emailValid, passwordValid, handleOnInputChange, formObject, isValidForm, } 
    = useForm({ email: "", password: "" }, formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleOnSubmit = (e: any): void => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isValidForm) return;

    console.log(formObject);
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleOnSubmit} >
      <InputField type="email" name="email" label="Correo electrónico" value={email} onChange={handleOnInputChange} pattern={emailP.html} 
        placeholder="ejemplo@00.com" isValid={!emailValid && formSubmitted} description="Ingresa tu correo" minLength={9}
      />

      <InputFieldPassword label="Contraseña" value={password} onChange={handleOnInputChange} placeholder="**********" isValid={!passwordValid && formSubmitted}
        description="Ingresa tu contraseña" minLength={5}
      />

      <Link to="/auth/register" className="text-sm text-emerald-500" >
        ¿No tienes una cuenta?. ¡Registrate aquí!.
      </Link>

      <button type="submit" disabled={false} className="bg-emerald-500 text-white self-center disabled:bg-emerald-100 hover:bg-emerald-600 transition-all ease-in-out" >
        Ingresar
      </button>
    </form>
  );
};
