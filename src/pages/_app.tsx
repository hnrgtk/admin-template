import "tailwindcss/tailwind.css";
import { ThemeModeProvider } from "../contexts/ThemeModeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { GlobalStyle } from "../styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeModeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeModeProvider>
    </AuthProvider>
  );
}

export default MyApp;
