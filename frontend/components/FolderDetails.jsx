import { useEffect, useState } from "react";
import {
  Folder,
  Upload,
  Pencil,
  Trash2,
  Download,
  MoreVertical,
  FileText,
  Image,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RenameFolderModal from "../components/RenameFolderModal";
import UploadFileModal from "../components/UploadFileModal";
import useAxios from "../src/hooks/useAxios";
import { useParams } from "react-router-dom";

export default function FolderDetails() {
  const [loading, setLoading] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const [deletingFolder, setDeletingFolder] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { folderId } = useParams();
  const api = useAxios();
  const [folder, setFolder] = useState({});
  const [folderName, setFolderName] = useState("");

  const getFolder = async () => {
    try {
      const response = await api.get(`/api/folder/${folderId}`);
      setFolder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolder();
  }, []);

  const renameFolder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(`/api/folder/rename/${folderId}`, {
        name: folderName,
      });
      if (response.status === 200) {
        getFolder();
        setShowRenameModal(false);
        setFolderName("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFolder = async () => {
    try {
      setDeletingFolder(true);
      const response = await api.delete(`/api/folder/delete/${folderId}`);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingFolder(false);
    }
  };

  const navigate = useNavigate();
  const [folderFiles, setFolderFiles] = useState([]);
  const getFolderFiles = async () => {
    try {
      const response = await api.get(`/api/file/${folderId}`);
      setFolderFiles(response.data.folderFiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFolderFiles();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // const DownloadFile = async (id, fileName) => {
  //   try {
  //     const response = await api.get(`/api/file/download/${id}`, {
  //       responseType: "blob",
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
        getFolderFiles();
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
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <Folder size={50} className="text-yellow-400 fill-yellow-300" />

            <h1 className="text-3xl font-semibold">{folder.name}</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="border border-blue-500 text-blue-600 px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              <Upload size={18} />
              Upload File
            </button>

            <button
              onClick={() => {
                setFolderName(folder.name);
                setShowRenameModal(true);
              }}
              className="border px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              <Pencil size={18} />
              Rename
            </button>

            <button
              onClick={deleteFolder}
              className="border border-red-300 text-red-500 px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              {deletingFolder ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Trash2 size={18} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Size</th>
                <th className="p-4 text-left">Uploaded</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {folderFiles.map((file) => (
                <tr key={file._id} className="border-b last:border-none">
                  <td className="p-4">
                    <div
                      onClick={() => navigate(`/dashboard/file/${file._id}`)}
                      className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
                    >
                      {file.name.includes(".png") ? (
                        <Image size={18} className="text-green-500" />
                      ) : (
                        <FileText size={18} className="text-red-500" />
                      )}

                      {file.name}
                    </div>
                  </td>

                  <td className="p-4">{file.type}</td>

                  <td className="p-4">{formatFileSize(file.size)}</td>

                  <td className="p-4">
                    {new Date(file.uploaded).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        download={file.name}
                      >
                        <Download
                          // onClick={() => DownloadFile(file._id, file.name)}
                          className="cursor-pointer"
                          size={18}
                        />
                      </a>

                      {deletingFileId === file._id ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2
                          onClick={() => deleteFile(file._id)}
                          className="cursor-pointer"
                          size={18}
                          color="red"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="md:hidden space-y-4">
          {folderFiles.map((file) => (
            <div key={file._id} className="bg-white border rounded-xl p-4">
              <h3 className="font-medium">{file.name}</h3>

              <p className="text-sm text-gray-500 mt-2">
                {formatFileSize(file.size)}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(file.uploaded).toLocaleString()}
              </p>

              <a href={file.fileUrl} target="_blank" download={file.name}>
                <button
                  // onClick={() => DownloadFile(file._id, file.name)}
                  className="mt-3 text-blue-600 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {showRenameModal && (
        <RenameFolderModal
          closeModal={() => setShowRenameModal(false)}
          folderName={folderName}
          setFolderName={setFolderName}
          handleSubmit={renameFolder}
          loading={loading}
        />
      )}

      {showUploadModal && (
        <UploadFileModal
          closeModal={() => setShowUploadModal(false)}
          folderId={folderId}
          folders={[]}
          getFiles={getFolderFiles}
        />
      )}
    </>
  );
}
