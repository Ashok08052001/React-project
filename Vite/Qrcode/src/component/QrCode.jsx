import { useState } from "react";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrtext, setqrtext] = useState("");
  const [size, reSize] = useState("");

  const generator = async () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrtext}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600">
      <div className="text-center space-y-6 bg-blue-950/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="font-extrabold text-white text-5xl tracking-widest drop-shadow-lg">
          QR Code Generator
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-600 mx-auto rounded-full"></div>

        {loading && <p className="text-white animate-pulse">Please wait...</p>}
        {img && (
          <img
            src={img}
            alt="QR Code"
            className="mx-auto w-60 h-60 rounded bg-white p-2 shadow-xl hover:scale-105 transition-transform duration-300"
          />
        )}

        <div className="space-y-4">
          <label className="text-white text-2xl font-semibold">
            Add URL <span className="ml-2">:</span>
          </label>
          <input
            type="text"
            value={qrtext}
            onChange={(e) => setqrtext(e.target.value)}
            className="ml-4 text-white w-64 p-2 border-2 border-white bg-transparent rounded focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder-white/70"
            placeholder="Enter the URL"
          />

          <label className="text-white text-2xl p-4 font-semibold">
            Image Size :
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => reSize(e.target.value)}
            placeholder="Enter size (e.g. 200)"
            className="ml-4 text-white w-64 p-2 border-2 border-white bg-transparent rounded focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder-white/70"
          />
        </div>
        <div className="space-x-4 mt-6">
          <button
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={generator}
            disabled={loading}
          >
            Generate QR Code
          </button>

          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={download}
            disabled={!img}
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
