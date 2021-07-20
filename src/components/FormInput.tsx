import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  control: Control<any>;
  type?: "text" | "email" | "password";
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormInput(props: FormInputProps) {
  const { errorMessage, ...rest } = props;
  const {
    field: { ref, ...inputProps },
  } = useController({
    ...rest,
    defaultValue: "",
  });

  return (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input
        type={props.type || "text"}
        {...inputProps}
        {...rest}
        ref={ref}
        className={`
          px-4 py-3 rounded-lg
          bg-gray-200 mt-2 border 
          focus:border-blue-500 focus:bg-white
          focus:outline-none
          placeholder-gray-500 
        `}
      />
      {props.errorMessage && <span className="mt-1 text-red-500 text-sm">{props.errorMessage}</span>}
    </div>
  );
}
