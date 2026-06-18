import { X } from "lucide-react";

export default function CreateFolderModal({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Create Folder</h2>

          <button onClick={closeModal}>
            <X />
          </button>
        </div>

        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium">Folder Name</label>

          <input
            type="text"
            placeholder="Enter folder name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={closeModal} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
