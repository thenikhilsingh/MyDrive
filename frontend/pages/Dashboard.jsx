import React, { useContext, useEffect, useState } from "react";
import { Search, Upload } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import FolderCard from "../components/FolderCard";
import FileTable from "../components/FileTable";

import CreateFolderModal from "../components/CreateFolderModal";
import UploadFileModal from "../components/UploadFileModal";
import { AuthContext } from "../src/App";
import axios from "axios";
import useAxios from "../src/hooks/useAxios.js";

export default function Dashboard() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

function DashboardHome() {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const api = useAxios();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const getFolders = async () => {
    try {
      const response = await api.get("/api/folder/");
      setFolders(response.data.allFolders);
    } catch (error) {
      console.log(error);
    }
  };
  const getFiles = async () => {
    try {
      const response = await api.get("/api/file/");
      setFiles(response.data.files);
      console.log(response.data.files);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolders();
    getFiles();
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search files and folders..."
              className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Upload File
          </button>
        </div>

        {/* New Folder */}
        <button
          onClick={() => setShowCreateFolder(true)}
          className="border border-blue-500 text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50"
        >
          + New Folder
        </button>

        {/* Folder Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {folders.map((folder) => (
            <FolderCard key={folder._id} folder={folder} />
          ))}
        </div>

        {/* File Table */}
        <FileTable files={files} />
      </div>

      {showCreateFolder && (
        <CreateFolderModal
          closeModal={() => setShowCreateFolder(false)}
          getFolders={getFolders}
        />
      )}

      {showUploadModal && (
        <UploadFileModal
          closeModal={() => setShowUploadModal(false)}
          folders={folders}
          getFiles={getFiles}
        />
      )}
    </>
  );
}

export { DashboardHome };
