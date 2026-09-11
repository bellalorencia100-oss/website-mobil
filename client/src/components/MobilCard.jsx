import { Link } from "react-router-dom";

//DECORASI CARD ETALASE PRODUK MOBIL
function MobilCard({ image, nama, tahun, harga, id }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <img src={image} className="w-full aspect-[4/3] object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-base">{nama}</h3>
        <p className="text-sm text-gray-500 mb-2">Tahun {tahun}</p>
        <p className="text-red-700 font-bold text-lg mb-3">
          {" "}
          Rp {harga.toLocaleString("id-ID")}
        </p>
        <Link to={`/mobil/${id}`}>
          <button className="w-full bg-red-700 text-white py-2 rounded font-semibold hover:bg-red-800 transition cursor-pointer">
            Lihat Detail
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MobilCard;
