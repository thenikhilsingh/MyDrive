import { Link } from "react-router-dom";
import { CloudUpload, Eye } from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
            <CloudUpload size={60} className="text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold mt-6">
            My<span className="text-blue-600">Drive</span>
          </h1>

          <p className="text-gray-500 text-center mt-3 max-w-xs">
            Store, organize and access your files anytime, anywhere.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Signup</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                Signup
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
