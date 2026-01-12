import { useState } from "react";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [size, setSize] = useState("");

  const generateQr = async () => {
    if (!qrData) return; // Prevent empty generation
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size || 150}x${size || 150}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQr = () => {
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 font-sans">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            QR Generator
          </h1>
          <p className="text-blue-100/80 text-sm font-medium">Create & Download Custom QR Codes</p>
        </div>

        {/* QR Display Area */}
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-white/80 animate-pulse text-sm">Generating...</p>
            </div>
          ) : img ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={img}
                alt="Generated QR Code"
                className="relative w-48 h-48 rounded-xl shadow-2xl border-4 border-white/20 bg-white p-2"
              />
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-white/20 rounded-xl w-full text-white/40">
              <span className="block text-sm">QR Code will appear here</span>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-100 ml-1">URL or Text</label>
            <input
              type="text"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder="Enter URL or text here..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-100 ml-1">Size (Optional)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 200 (Default: 150)"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={generateQr}
            disabled={loading || !qrData}
            className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Generate
          </button>

          <button
            onClick={downloadQr}
            disabled={!img}
            className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Download
          </button>
        </div>

      </div>

      {/* Footer / Credits */}
      <footer className="mt-8 text-white/40 text-xs text-center">
        <p>Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default QrCode;
