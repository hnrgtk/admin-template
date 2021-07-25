import { AuthProvider } from "./AuthContext";
import { ThemeModeProvider } from "./ThemeModeContext";

const composeProviders = (...providers) => props =>
	providers.reduceRight(
		(children, Provider) =>
			<Provider {...props}>{children}</Provider>,
		props.children,
	);

export const AllProviders = composeProviders(
	AuthProvider,
	ThemeModeProvider,
);
