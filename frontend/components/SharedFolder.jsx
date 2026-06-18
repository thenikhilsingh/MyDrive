import { Folder, FileText, Image, Download, Share2 } from "lucide-react";

export default function SharedFolder() {
  const folder = {
    name: "Project Documents",
    owner: "Nikhil Singh",
  };

  const files = [
    {
      id: 1,
      name: "Resume.pdf",
      size: "2.4 MB",
      uploaded: "16 Jun 2026",
    },
    {
      id: 2,
      name: "Project Proposal.docx",
      size: "1.3 MB",
      uploaded: "15 Jun 2026",
    },
    {
      id: 3,
      name: "Photo.png",
      size: "2.1 MB",
      uploaded: "14 Jun 2026",
    },
  ];

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

              <p className="text-gray-500 mt-2">Shared by {folder.owner}</p>
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
              {files.map((file) => (
                <tr key={file.id} className="border-b last:border-none">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {file.name.includes(".png") ? (
                        <Image size={18} className="text-green-500" />
                      ) : (
                        <FileText size={18} className="text-red-500" />
                      )}

                      {file.name}
                    </div>
                  </td>

                  <td className="p-4">{file.size}</td>

                  <td className="p-4">{file.uploaded}</td>

                  <td className="p-4">
                    <button className="text-blue-600 flex items-center gap-2">
                      <Download size={18} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
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
    </div>
  );
}
