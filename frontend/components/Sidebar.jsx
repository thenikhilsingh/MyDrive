import { useState } from "react";
import {
  Folder,
  FileText,
  Trash2,
  LogOut,
  Menu,
  X,
  Cloud,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-lg border"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300
        ${
          openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="text-blue-600" />
            <h1 className="font-bold text-blue-600">MyDrive</h1>
          </div>

          <button onClick={() => setOpenSidebar(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <FileText size={18} />
            All Files
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
              }`
            }
          >
            <User size={18} />
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/folders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            <Folder size={18} />
            Folders
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4 border-t">
          <button
            onClick={() => navigate("/logout")}
            className="flex items-center gap-3 text-gray-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
