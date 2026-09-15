function pastikanEkstensiJpg(nama) {
  const namaTanpaEkstensi = nama.replace(/\.[^/.]+$/, "");
  return `${namaTanpaEkstensi}.jpg`;
}

export function getCroppedImg(
  imageSrc,
  croppedAreaPixels,
  fileName = "foto-utama.jpg",
) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Gagal memproses gambar"));
            return;
          }
          const file = new File([blob], pastikanEkstensiJpg(fileName), {
            type: "image/jpeg",
          });
          resolve(file);
        },
        "image/jpeg",
        0.9,
      );
    };

    image.onerror = (err) => reject(err);
  });
}
