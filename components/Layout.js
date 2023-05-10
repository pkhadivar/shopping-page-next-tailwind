import Head from "next/head";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";

import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import { Menu } from "@headlessui/react";
import { CartContext } from "../context/Cart";

import DropDown from "./DropDown";

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.qty, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove();

    signOut({ callbackUrl: "/login" });
  };

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
                  <span clasName="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-500">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 bg-white rounded-xl p-4 origin-top-right border-w border-slate-100">
                    <Menu.Item>
                      <DropDown className="flex p-2" href="/profile">
                        Profile
                      </DropDown>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="flex p-2" href="#" onClick={logoutHandler}>
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
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
