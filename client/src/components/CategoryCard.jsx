import { Link } from "react-router-dom";

function CategoryCard({ name, logo }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link to={`/katalog?merek=${name}`}>
        <div className="w-14 h-14 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-2 transition hover:shadow-md hover:border-red-300 hover:scale-110 active:shadow-md active:border-red-300 active:scale-110">
          <img src={logo} className="w-8 h-8 object-contain" />
        </div>
      </Link>
      <span className="text-xs text-center w-14">{name}</span>
    </div>
  );
}
export default CategoryCard;
