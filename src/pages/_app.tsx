import "tailwindcss/tailwind.css";
import { ThemeModeProvider } from "../contexts/ThemeModeContext";
import { GlobalStyle } from "../styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeModeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeModeProvider>
  );
}

export default MyApp;
