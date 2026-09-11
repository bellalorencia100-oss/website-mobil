import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage.js";

const CropModal = ({ imageSrc, fileName, onClose, onSimpan }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((_croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSimpan = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const fileHasilCrop = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        fileName,
      );
      onSimpan(fileHasilCrop);
    } catch (err) {
      alert("Gagal memotong foto, coba lagi.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-red-700 text-sm">
            Atur Posisi Foto Utama
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <div className="relative h-72 bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 w-12">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-red-700"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Geser foto atau ubah zoom untuk memilih bagian yang mau ditampilkan.
            Bagian di luar kotak akan terpotong.
          </p>
        </div>

        <div className="px-5 pb-5 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn bg-gray-100 text-gray-700 hover:bg-gray-200 border-none"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSimpan}
            disabled={isProcessing}
            className="flex-1 btn bg-red-700 text-white hover:bg-red-800 border-none"
          >
            {isProcessing ? "Memproses..." : "Simpan Crop"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
