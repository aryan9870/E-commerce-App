import { assets } from "../assets/assets";
import RatingDisplay from "./RatingDisplay";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
  <div onClick={() => {navigate(`/product/${product._id}`); scrollTo(0, 0)}} className="cursor-pointer">
      <img className="w-64 h-64" src={product.images[0]} alt="" />
      <div className="mt-2 flex flex-col gap-2">
        <p className="font-semibold">{product.name}</p> 
        <div>
            <RatingDisplay rating={product.ratings} />
        </div>
        <div className="font-semibold gap-2 flex items-center">
          <span className="">${product.discountPrice}</span>
          <span className="text-gray-400 line-through italic">${product.price}</span>
          <span className="text-red-600 bg-red-50 font-extralight px-2 flex items-center justify-center text-xs rounded-full">
            {product.discountPrice ? `-${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
