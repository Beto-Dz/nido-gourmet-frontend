import { Link } from "react-router";
import { useForm } from "../../hooks";
import { patterns } from "../../utilitys";
import { useState } from "react";
import { InputField, InputFieldPassword } from "../../components";

// obteniendo el patron de correo
const { onlyLetters, onlyNumbers, email: emailP } = patterns;

// objeto con funciones de validacion
const formValidations = {
  name: (value: string): boolean =>
    value.length >= 3 && onlyLetters.js.test(value),
  email: (value: string): boolean => value.length >= 9 && emailP.js.test(value),
  password: (value: string): boolean => value.length >= 5,
  phone: (value: string): boolean =>
    value.length >= 6 && onlyNumbers.js.test(value),
};

export const Register = () => {
  // custom hook para formulario
  const { name, email, password, phone, nameValid, emailValid, passwordValid, phoneValid, handleOnInputChange, formObject, isValidForm, } 
  = useForm({ name: "", email: "", password: "", phone: "" }, formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // funcion de ayuda para el envio del formulario
  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isValidForm) return;

    console.log(formObject);
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleOnSubmit} >
      <InputField type="text" name="name" label="Nombre" value={name} onChange={handleOnInputChange} pattern={onlyLetters.html} 
        placeholder="¿Cuál es tu nombre?" isValid={!nameValid && formSubmitted} description="Ingresa tu nombre" minLength={3} />

      <InputField type="tel" name="phone" label="Número de teléfono" value={phone} onChange={handleOnInputChange} pattern={onlyNumbers.html}
        placeholder="######" isValid={!phoneValid && formSubmitted} description="Ingresa tu número telefónico" minLength={6} />

      <InputField type="email" name="email" label="Correo electrónico" value={email} onChange={handleOnInputChange} pattern={emailP.html}
        placeholder="ejemplo@00.com" isValid={!emailValid && formSubmitted} description="Ingresa tu correo" minLength={9} />

      <InputFieldPassword label="Contraseña" value={password} onChange={handleOnInputChange}
        placeholder="**********" isValid={!passwordValid && formSubmitted} description="Ingresa tu contraseña" minLength={5} />
      
      <Link to="/auth" className="text-sm text-twine-500" >
        ¿Ya tiene una cuenta?. ¡Inicia sesión aquí!.
      </Link>

      <button type="submit" disabled={false} className="bg-twine-400 text-white self-center disabled:bg-twine-100 hover:bg-twine-600 transition-all ease-in-out" >
        Ingresar
      </button>
    </form>
  );
};
