import { FileText, Download, Trash2, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import useAxios from "../src/hooks/useAxios";
import { useParams } from "react-router-dom";

export default function FileDetails() {
  const { fileId } = useParams();
  const api = useAxios();
  const [fileInfo, setFileInfo] = useState({});

  const getFileInfo = async () => {
    try {
      const response = await api.get(`/api/file/info/${fileId}`);
      setFileInfo(response.data.fileInfo);
      console.log(response.data.fileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFileInfo();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Section */}
          <div className="flex justify-center">
            <div className="w-52 h-64 md:w-64 md:h-80 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center justify-center">
              <FileText size={90} className="text-red-500" />

              <span className="mt-4 font-medium text-red-500">PDF</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{fileInfo.name}</h1>

            <div className="mt-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">File Type</span>

                <span>{fileInfo.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">File Size</span>

                <span>{formatFileSize(fileInfo.size)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">Uploaded On</span>

                <span>{new Date(fileInfo.uploaded).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">Folder</span>

                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow-500" />

                  {fileInfo.folder?.name}
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                <Download size={18} />
                Download File
              </button>

              <button className="border border-red-300 text-red-500 hover:bg-red-50 px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                <Trash2 size={18} />
                Delete File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
