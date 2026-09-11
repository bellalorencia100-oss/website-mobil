//decorasi feature terbaik dari jual beli mobil
function FeatureCard({ image, Icon, judul, deskripsi }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition text-center bg-red-700">
      <div className="relative">
        <img src={image} className="w-full h-auto object-cover" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-white border-4 border-red-700 rounded-full w-12 flex h-12 items-center justify-center">
          <Icon className="text-red-700 text-xl" />
        </div>
      </div>
      <div className="pt-8 pb-4 px-3">
        <h3 className="font-semibold text-sm mb-1 text-white">{judul}</h3>
        <p className="text-xs text-white-500">{deskripsi}</p>
      </div>
    </div>
  );
}
export default FeatureCard;
