import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/FormInput";
import Image from "next/image";
import googleIcon from "../../public/google.svg";
import { useAuth } from "../hooks/useAuth";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type LoginFormType = {
	email: string;
	password: string;
};

const schema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }),
	password: z.string().min(6, { message: 'A senha deve ter 6 ou mais caracteres.' })
})

export default function Login() {
	const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
		resolver: zodResolver(schema)
	});

	const { createUser, signInWithEmailAndPassword, signInWithGoogle, loading } = useAuth();
	const [authState, setAuthState] = useState<"signIn" | "signUp">("signIn");

	const isSignIn = authState === "signIn";

	// mudar depois isso, ta feão. 
	const buttonLabel =
		isSignIn ?
			loading ?
				"Entrando..." : "Entrar" :
			loading ? "Aguarde..." : "Cadastrar";

	async function submit(values: LoginFormType) {
		try {
			if (isSignIn) {
				await signInWithEmailAndPassword(values.email, values.password);
			} else {
				await createUser(values.email, values.password);
				setAuthState("signIn");
			}
		} catch (err) {
			console.log(err?.message);
		}
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
			<div className="m-10 w-full md:w-1/2 lg:w-1/3 xs:p-6">
				<h1 className="xs:text-2xl md:text-3xl font-bold mb-5">
					{isSignIn ? "Entre com a sua conta" : "Cadastre-se"}
				</h1>
				<FormInput
					label="E-mail"
					name="email"
					control={control}
					placeholder="Digite seu email"
					errorMessage={errors?.email?.message} />
				<FormInput
					label="Senha"
					name="password"
					control={control}
					type="password"
					placeholder="Digite sua senha"
					errorMessage={errors?.password?.message}
				/>
				<button
					onClick={handleSubmit(submit)}
					className={`
             w-full bg-indigo-500 hover:bg-indigo-400
             text-white rounded-lg px-3 py-2 mt-6
        `}
				>
					{buttonLabel}
				</button>
				<hr className="my-6 border-gray-300 w-full" />
				<button
					onClick={signInWithGoogle}
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
				{isSignIn ? (
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
				) : (
					<p className="mt-4">
						Já possui uma conta?
						<a
							onClick={() => setAuthState("signIn")}
							className={`
							text-blue-500 hover:text-blue-700
							font-semibold cursor-pointer
						`}
						>
							{" "}
							Acesse agora
						</a>
					</p>
				)}
			</div>
		</div>
	);
}
