import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function ProductSection({ title, products }) {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-10 mt-10 max-sm:mt-5 mx-20 max-sm:mx-5">
      <h2 className="text-3xl font-bold text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <button onClick={() => navigate("/collection")} className="border-gray-200 border block mx-auto px-10 max-sm:px-5 py-2 max-sm:w-full rounded-full cursor-pointer">
        View All
      </button>
    </section>
  );
}

export default ProductSection;
