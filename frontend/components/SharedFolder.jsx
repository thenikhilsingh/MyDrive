import { Folder, FileText, Image, Download, Share2, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SharedFolder() {
  const { shareToken } = useParams();
  const [error, setError] = useState("");
  const [folder, setFolder] = useState({});
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getSharedFolder = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/folder/share/${shareToken}`,
      );

      setFolder(response.data.folder);
      setFiles(response.data.files);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getSharedFolder();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Folder size={40} className="text-yellow-400 fill-yellow-300" />

                <h1 className="text-3xl font-semibold">{folder.name}</h1>
              </div>

              <p className="text-gray-500 mt-2">
                Shared by {folder.createdBy?.name}
              </p>
              <p className="text-sm text-orange-500 mt-1">
                Expires on{" "}
                {new Date(folder.shareExpiresAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <button className="border px-5 py-3 rounded-lg flex items-center gap-2">
              <Share2 size={18} />
              Shared Folder
            </button>
          </div>
        </div>

        {/* Desktop Table */}

        <div className="hidden md:block mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Size</th>

                <th className="p-4 text-left">Uploaded</th>

                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) =>
                files.length === 0 ? (
                  <div className="bg-white border rounded-xl p-10 text-center">
                    <Folder size={50} className="mx-auto text-gray-400" />

                    <h2 className="mt-4 text-lg font-medium">
                      No files available
                    </h2>

                    <p className="text-gray-500 mt-1">
                      This shared folder is empty.
                    </p>
                  </div>
                ) : (
                  <tr key={file.id} className="border-b last:border-none">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {file.type?.startsWith("image/") ? (
                          <Image size={18} className="text-green-500" />
                        ) : (
                          <FileText size={18} className="text-red-500" />
                        )}

                        {file.name}
                      </div>
                    </td>

                    <td className="p-4">{file.size}</td>

                    <td className="p-4">
                      {new Date(file.uploaded).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedFile(file);
                            setShowPreview(true);
                          }}
                          className="text-green-600 flex items-center gap-2"
                        >
                          <Eye size={18} />
                          View
                        </button>
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={file.name}
                        >
                          <button className="text-blue-600 flex items-center gap-2">
                            <Download size={18} />
                            Download
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="md:hidden mt-6 space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                {file.name.includes(".png") ? (
                  <Image size={20} className="text-green-500" />
                ) : (
                  <FileText size={20} className="text-red-500" />
                )}

                <div>
                  <h3 className="font-medium">{file.name}</h3>

                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Uploaded: {file.uploaded}
              </p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                <Download size={18} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPreview && selectedFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl p-4 relative">
            <button
              onClick={() => {
                setShowPreview(false);
                setSelectedFile(null);
              }}
              className="absolute right-4 top-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">{selectedFile.name}</h2>

            {selectedFile.type?.startsWith("image/") ? (
              <img
                src={selectedFile.fileUrl}
                alt={selectedFile.name}
                className="max-h-[70vh] mx-auto"
              />
            ) : selectedFile.type === "application/pdf" ? (
              <iframe
                src={selectedFile.fileUrl}
                className="w-full h-[70vh]"
                title={selectedFile.name}
              />
            ) : (
              <div className="text-center py-10">
                Preview not available for this file type.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
