import { useState } from "react";
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
import Breadcrumb from "../components/Breadcrumb";
import RenameFolderModal from "../components/RenameFolderModal";
import UploadFileModal from "../components/UploadFileModal";

export default function FolderDetails() {
  const [showRenameModal, setShowRenameModal] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const navigate = useNavigate();
  const files = [
    {
      id: 1,
      name: "Resume.pdf",
      type: "File",
      size: "2.4 MB",
      uploaded: "16 Jun 2024",
    },
    {
      id: 2,
      name: "Project Proposal.docx",
      type: "File",
      size: "1.3 MB",
      uploaded: "15 Jun 2024",
    },
    {
      id: 3,
      name: "Notes.txt",
      type: "File",
      size: "800 B",
      uploaded: "14 Jun 2024",
    },
    {
      id: 4,
      name: "Photo.png",
      type: "File",
      size: "2.1 MB",
      uploaded: "14 Jun 2024",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <Breadcrumb items={["All Files", "Documents"]} />

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <Folder size={50} className="text-yellow-400 fill-yellow-300" />

            <h1 className="text-3xl font-semibold">Documents</h1>
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
              onClick={() => setShowRenameModal(true)}
              className="border px-5 py-2.5 rounded-lg flex items-center gap-2"
            >
              <Pencil size={18} />
              Rename
            </button>

            <button className="border border-red-300 text-red-500 px-5 py-2.5 rounded-lg flex items-center gap-2">
              <Trash2 size={18} />
              Delete
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
              {files.map((file) => (
                <tr key={file.id} className="border-b last:border-none">
                  <td className="p-4">
                    <div
                      onClick={() => navigate(`/dashboard/file/${file.id}`)}
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

                  <td className="p-4">{file.size}</td>

                  <td className="p-4">{file.uploaded}</td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <Download size={18} />

                      <MoreVertical size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="md:hidden space-y-4">
          {files.map((file) => (
            <div key={file.id} className="bg-white border rounded-xl p-4">
              <h3 className="font-medium">{file.name}</h3>

              <p className="text-sm text-gray-500 mt-2">{file.size}</p>

              <p className="text-sm text-gray-500">{file.uploaded}</p>

              <button className="mt-3 text-blue-600 flex items-center gap-2">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {showRenameModal && (
        <RenameFolderModal
          currentName="Documents"
          closeModal={() => setShowRenameModal(false)}
        />
      )}

      {showUploadModal && (
        <UploadFileModal closeModal={() => setShowUploadModal(false)} />
      )}
    </>
  );
}
