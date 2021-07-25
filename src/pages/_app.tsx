import "tailwindcss/tailwind.css";
import { GlobalStyle } from "../styles/global";
import { AllProviders } from "../contexts";

function MyApp({ Component, pageProps }) {
	return (
		<AllProviders>
			<GlobalStyle />
			<Component {...pageProps} />
		</AllProviders>
	);
}

export default MyApp;
