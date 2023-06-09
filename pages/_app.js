import "@/styles/globals.css";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CartContextProvider } from "../context/Cart";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <div className="bg-gray-100">
      <SessionProvider session={session}>
        <CartContextProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </CartContextProvider>
      </SessionProvider>
    </div>
  );
};

const Auth = ({ children }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  if (status === "loading") {
    return "Loading";
  }

  return children;
};

export default App;
