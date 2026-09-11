import fortunerwhite from "../assets/fortunerwhite.png";
import bekasterbesar from "../assets/BEKAS-TERBESAR.png";
import toyotayarisred from "../assets/toyota-yaris-red.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Banner() {
  const images = [bekasterbesar, toyotayarisred, fortunerwhite];
  const [index, setindex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setindex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/katalog">
      <img src={images[index]} className="w-full h-auto" />
    </Link>
  );
}

export default Banner;
