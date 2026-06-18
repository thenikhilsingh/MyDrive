import { FileText, Download, Trash2, Folder } from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";

export default function FileDetails() {
  const file = {
    name: "Resume.pdf",
    size: "2.4 MB",
    uploadedOn: "16 Jun 2024, 10:30 AM",
    folder: "Documents",
    type: "PDF Document",
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={["All Files", "Documents", "Resume.pdf"]} />

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
            <h1 className="text-3xl font-semibold">{file.name}</h1>

            <div className="mt-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">File Type</span>

                <span>{file.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">File Size</span>

                <span>{file.size}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">Uploaded On</span>

                <span>{file.uploadedOn}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <span className="text-gray-500">Folder</span>

                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow-500" />

                  {file.folder}
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
