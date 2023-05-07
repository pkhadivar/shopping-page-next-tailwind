import Head from "next/head";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/Cart";

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.qty, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{`${title} - Shoping`}</title>
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
            <Link legacyBehavior className="text-lg font-bold" href="/">
              Shopping
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
                {cart.cartItems.lenght > 0 && (
                  <span clasName="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">{cartItemsCount}</span>
                )}
              </Link>
              <Link className="p-2" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10">
          Footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
