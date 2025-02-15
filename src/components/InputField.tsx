import { ChangeEvent, FC } from "react";

interface Props {
  type: string;
  name: string;
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

export const InputField: FC<Props> = ({ type, name, label, value, onChange, pattern, placeholder, isValid, description, minLength, required = true }) => {

  const peer = `peer/${name}`;
  const peerInvalid = `peer-invalid/${name}`;

  return (
    <div className="flex flex-col gap-px">
      <label htmlFor={name} className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        minLength={minLength}
        pattern={pattern}
        required={required}
        autoComplete="on"
        placeholder={placeholder}
        className={`p-1 rounded-md ring-2 ring-emerald-200 ${peer} ${ isValid ? "invalid:ring-red-400" : "focus:ring-primary-black" } transition-all ease-in-out`}
      />
      <span className={`text-slate-500 text-xs ${ isValid ? `${peerInvalid}:text-red-500` : "" } `} >
        {`${description} (mayor a ${minLength} caracteres).`}
      </span>
    </div>
  );
};
