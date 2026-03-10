import { FaStar } from "react-icons/fa";

function RatingDisplay({ rating }) {
  return (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? "opacity-100" : "opacity-30"} />
      ))}
    </div>
  );
}

export default RatingDisplay;