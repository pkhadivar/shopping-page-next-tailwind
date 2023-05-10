import { useRouter } from "next/router";
import Image from "next/image";

import { useContext } from "react";
import { CartContext } from "../../context/Cart";

import db from "../../utils/db"
import Product from "../../models/product"

import Layout from "../../components/Layout";


const ProductPage = ({product}) => {
  const { state, dispatch } = useContext(CartContext);

  const router = useRouter();

  if (!product) return <h2>There is no product</h2>;

  const addToCartHandler = () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      alert("Product is out.");

      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: { ...product, qty } });

    router.push("/cart")
  };

  return (
    <Layout title={product.title}>
      <div className="grid md:grid-cols-4 md:gap-3 bg-white rounded-xl p-10">
        <div className="md:cols-span-2">
          <Image
            className="rounded-xl"
            src={product.image}
            alt="product image"
            width={340}
            height={340}
          />
        </div>
        <div>
          <div className="text-lg">
            <h2>{product.title}</h2>
            <p>{product.cat}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div>Price:</div>
            <div>{product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status:</div>
            <div>{product.count > 0 ? "Available" : "Unavailble"}</div>
          </div>
          <button
            onClick={addToCartHandler}
            className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;


export const getServerSideProps = async (context) => {

  const { params } = context
  const { slug } = params

  await db.connect()

  const product = await Product.findOne({ slug }).lean()

  return {
    props: {
      product: product ? db.converToObj(product) : null,
    }
  }
}
