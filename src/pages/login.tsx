/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/FormInput";
import Image from "next/image";
import googleIcon from "../assets/icons/google.svg";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormType>();
  const [authState, setAuthState] = useState<"signIn" | "signUp">("signIn");

  const isSignIn = authState === "signIn";

  function submit(values: LoginFormType) {
    console.log(values);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <aside className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </aside>
      <div className=" m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-5">
          {isSignIn ? "Entre com a sua conta" : "Cadastre-se na Plataforma"}
        </h1>
        <FormInput label="E-mail" name="email" control={control} />
        <FormInput
          label="Senha"
          name="password"
          control={control}
          type="password"
        />
        <button
          onClick={handleSubmit(submit)}
          className={`
          w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg px-3 py-2 mt-6
        `}
        >
          {isSignIn ? "Entrar" : "Cadastrar"}
        </button>
        <hr className="my-6 border-gray-300 w-full" />
        <button
          onClick={handleSubmit(submit)}
          className={`
            flex items-center justify-center
            w-full bg-white border border-black
          text-black rounded-lg px-3 py-2 mt-6
        `}
        >
          <div className="flex mr-2">
            <Image src={googleIcon} alt="Google" width={26} height={26} />
          </div>
          Entrar com o Google
        </button>
        {isSignIn && (
          <p className="mt-4">
            Não tem uma conta?
            <a
              onClick={() => setAuthState("signUp")}
              className={`
                text-blue-500 hover:text-blue-700
                font-semibold cursor-pointer
              `}
            >
              {" "}
              Cadastre-se
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
