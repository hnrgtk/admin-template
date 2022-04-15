import "@stripe/stripe-js";
import "tailwindcss/tailwind.css";
import { GlobalStyle } from "../styles/global";
import { AllProviders } from "../contexts";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
	return (
		<AllProviders>
			<Toaster />
			<GlobalStyle />
			<Component {...pageProps} />
		</AllProviders>
	);
}

export default MyApp;
