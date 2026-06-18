import { X } from "lucide-react";

export default function UploadFileModal({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
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

            <input type="file" className="w-full border rounded-lg p-3" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Folder
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Documents</option>
              <option>Images</option>
              <option>Projects</option>
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

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
