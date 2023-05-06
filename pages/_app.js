import "@/styles/globals.css";
import { CartContextProvider } from "../context/Cart";
export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-100">
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </div>
  );
}
