import { Control, useController } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  control: Control<any>;
  type?: "text" | "email" | "password";
};

export function FormInput(props: FormInputProps) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    ...props,
    defaultValue: "",
  });
  return (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input
        type={props.type || "text"}
        {...inputProps}
        ref={ref}
        className={`
          px-4 py-3 rounded-lg
        bg-gray-200 mt-2 border 
        focus:border-blue-500 focus:bg-white
          focus:outline-none
        `}
      />
    </div>
  );
}
