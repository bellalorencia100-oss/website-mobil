import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function CategoryCard({ name, logo, categoryId }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const target = categoryId
    ? `/katalog?kategori=${categoryId}`
    : `/katalog?merek=${name}`;

  const handleClick = (e) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      navigate(target);
      setIsNavigating(false);
    }, 400);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Link to={target} onClick={handleClick}>
        <div className="w-14 h-14 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-2 transition hover:shadow-md hover:border-red-300 hover:scale-110 active:shadow-md active:border-red-300 active:scale-110">
          <img src={logo} className="w-7 h-7 object-contain" />
        </div>
      </Link>
      <span className="text-xs text-center w-14">{name}</span>
      {isNavigating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
    </div>
  );
}
export default CategoryCard;
