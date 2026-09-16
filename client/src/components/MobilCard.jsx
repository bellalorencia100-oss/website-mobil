import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

//DECORASI CARD ETALASE PRODUK MOBIL
function MobilCard({ image, nama, tahun, harga, id }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleLihatDetail = (e) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/mobil/${id}`);
      setIsNavigating(false);
    }, 400);
  };
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer h-full flex flex-col">
      <img src={image} className="w-full aspect-[4/3] object-cover" />
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-base line-clamp-2 h-12">{nama}</h3>
        <p className="text-sm text-gray-500 mb-2">Tahun {tahun}</p>
        <p className="text-red-700 font-bold text-lg mb-3">
          {" "}
          Rp {harga.toLocaleString("id-ID")}
        </p>
        <Link
          to={`/mobil/${id}`}
          onClick={handleLihatDetail}
          className="mt-auto"
        >
          <button className="w-full bg-red-700 text-white py-2 rounded font-semibold hover:bg-red-800 transition cursor-pointer">
            Lihat Detail
          </button>
        </Link>
      </div>
      {isNavigating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
    </div>
  );
}

export default MobilCard;
