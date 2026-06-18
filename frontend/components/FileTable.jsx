import { FileText, Image, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FileTable({ files }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="hidden md:table w-full">
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
              <td
                onClick={() => navigate(`/dashboard/file/${file.id}`)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
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
                <MoreVertical size={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">
        {files.map((file) => (
          <div key={file.id} className="border rounded-lg p-4">
            <h3 className="font-medium">{file.name}</h3>

            <p className="text-sm text-gray-500">{file.size}</p>

            <p className="text-sm text-gray-500">{file.uploaded}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
