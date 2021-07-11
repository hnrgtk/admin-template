import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Poppins, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export default MyApp;
