import { EyeIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  name?: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  placeholder: string;
  isValid: boolean;
  description: string;
  minLength?: number;
  required?: boolean;
}

export const InputFieldPassword: FC<Props> = ({ name = "password", label, value, onChange, pattern, placeholder, isValid, description, minLength, required = true }) => {
  // estado para mostrar u ocultar contraseña
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const peer: string = `peer/${name}`;
  const peerInvalid: string = `peer-has-invalid/${name}`;

  return (
    <div className="flex flex-col gap-px relative">
      <label htmlFor={name} className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
        {label}
      </label>
      <label htmlFor={name} className={`p-1 flex ${peer} rounded-md ring-2 ring-emerald-200 ${   isValid ? "has-invalid:ring-red-400" : "has-focus:ring-emerald-500" } transition-all ease-in-out`} >
        <input
          type={passwordVisible ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          minLength={minLength}
          pattern={pattern}
          required={required}
          autoComplete="on"
          placeholder={placeholder}
          className={`grow`}
        />
        <EyeIcon className={`h-6 w-6 cursor-pointer ${   passwordVisible ? "stroke-emerald-500" : "stroke-emerald-200" }`} onClick={() => setPasswordVisible(!passwordVisible)} />
      </label>
      <span className={`text-slate-500 text-xs ${   isValid ? `${peerInvalid}password:text-red-500` : "" } `} >
        {`${description} (mayor a ${minLength} caracteres).`}
      </span>
    </div>
  );
};
