import Link from "next/link";
import Image from "next/image";
const ProductItem = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <div>
        <Link href={`/product/${item.slug}`}>
          <img src={item.image} className="rounded-t-xl" alt="" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`}>
          <h2 className="text-lg">{item.title}</h2>
        </Link>
        <p className="p-2">{item.price}</p>
        <button
          onClick={() => addToCart(item)}
          className="rounded-xl bg-gray-700 text-white px-4 py-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
