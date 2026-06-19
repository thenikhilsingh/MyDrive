import { X } from "lucide-react";
import useAxios from "../src/hooks/useAxios";
import { useState } from "react";

export default function UploadFileModal({ closeModal, folders, getFiles }) {
  const api = useAxios();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }
      const fileData = new FormData(); //ye uploded file ki information object me store kar deta h kyunki hum db me direct file nhi bhej sakte
      fileData.append("file", selectedFile);
      if (selectedFolder) {
        fileData.append("folderId", selectedFolder);
      }
      const response = await api.post("/api/file/upload", fileData);
      if (response.status === 201) {
        getFiles();
        closeModal();
        setSelectedFile(null);
        setSelectedFolder("");
      }
      console.log("Folder:", selectedFolder);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <form
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6"
        onSubmit={handleUpload}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Upload File</h2>

          <button onClick={closeModal}>
            <X />
          </button>
        </div>

        <div className="space-y-5 mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Choose File
            </label>

            <input
              type="file"
              className="w-full border rounded-lg p-3"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Folder
            </label>

            <select
              className="w-full border rounded-lg p-3"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="">Select Folder</option>
              {folders.map((folder) => {
                return (
                  <option key={folder._id} value={folder._id}>
                    {folder.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-600">
            <p>Only PDF, JPG and PNG files are allowed.</p>

            <p className="mt-1">Maximum file size: 10 MB.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={closeModal} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
