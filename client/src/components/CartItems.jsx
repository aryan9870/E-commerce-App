import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import useCartStore from "../store/useCartStore";
import { useEffect } from "react";


const CartItems = () => {
  const { cart, getCart, updateCartQuantity, deleteCartItem } = useCartStore();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="rounded-xl border px-5 border-gray-200">
      {cart?.items?.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-5 border-gray-200 h-36 max-md:relative"
        >
          {/* LEFT SECTION */}
          <div className="flex gap-5 items-center justify-start md:flex-3 h-full">
            <img
              src={item?.product?.images[0]}
              alt={item?.product?.name}
              className="w-26 h-26 object-cover rounded-lg bg-gray-200 max-md:h-20 max-md:w-20"
            />

            <div>
              <h2 className="font-semibold max-md:text-sm">{item?.product?.name}</h2>

              <p className="text-gray-500 text-sm max-md:text-xs">Size: {item?.size}</p>

              <p className="text-gray-500 text-sm max-md:text-xs">Color: {item?.color}</p>

              <p className="font-bold max-md:text-sm mt-2">${item?.product?.price}</p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-end md:flex-1 md:h-full h-2/3 justify-between max-md:absolute max-md:top-6 max-md:right-1">
            <button onClick={() => deleteCartItem(item?.product?._id)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
                <MdOutlineDeleteForever size={25} />
            </button>

            {/* QUANTITY */}
            <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-1 gap-3">
              <button
                className="text-lg font-bold cursor-pointer"
                onClick={() => updateCartQuantity(item?.product?._id, "decrement")}
              >
                <TiMinus size={15} />
              </button>

              <span className="font-medium">{item?.quantity}</span>

              <button
                className="text-lg font-bold cursor-pointer"
                onClick={() => updateCartQuantity(item?.product?._id, "increment")}
              >
                <FaPlus size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
