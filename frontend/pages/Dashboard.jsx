import React, { useContext, useEffect, useState } from "react";
import { Search, Upload, Hand } from "lucide-react";
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
  const { user } = useContext(AuthContext);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const api = useAxios();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [deletingFileId, setDeletingFileId] = useState(null);
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

  // const DownloadFile = async (id, fileName) => {
  //   try {
  //     const response = await api.get(`/api/file/download/${id}`, {
  //       responseType: "blob", //responseType: "blob" is used to tell Axios to treat the response as binary file data instead of JSON or text, allowing files such as PDFs, images, and documents to be downloaded correctly.
  //     });

  //     const url = URL.createObjectURL(response.data);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = fileName;
  //     a.click();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteFile = async (id) => {
    try {
      setDeletingFileId(id);
      const response = await api.delete(`/api/file/delete/${id}`);
      if (response.status === 200) {
        getFiles();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingFileId(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user?.name
                ?.split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                Hello, {user?.name} <Hand size={18} />
              </p>
            </div>
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
        <FileTable
          files={files}
          // DownloadFile={DownloadFile}
          deleteFile={deleteFile}
          deletingFileId={deletingFileId}
        />
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
