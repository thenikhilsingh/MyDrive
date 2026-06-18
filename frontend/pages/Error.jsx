import { AlertTriangle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={50} className="text-red-500" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-center text-7xl md:text-8xl font-bold text-gray-900 mt-6">
          404
        </h1>

        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-center text-gray-500 mt-4 max-w-lg mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Please check the URL or return to your dashboard.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            <Home size={18} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg transition"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">File Uploader • Error 404</p>
        </div>
      </div>
    </div>
  );
}
