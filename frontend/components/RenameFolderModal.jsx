import { X } from "lucide-react";

export default function RenameFolderModal({
  closeModal,
  folderName,
  setFolderName,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <form
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Rename Folder</h2>

          <button onClick={closeModal}>
            <X />
          </button>
        </div>

        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium">Folder Name</label>

          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
            name="name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={closeModal} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
