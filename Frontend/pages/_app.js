// pages/_app.js
import "../styles/globals.css"; // ✅ Make sure this file exists

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
