import { X } from "lucide-react";
import useAxios from "../src/hooks/useAxios";
import { useState } from "react";

export default function CreateFolderModal({ closeModal, getFolders }) {
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const api = useAxios();

  const handleChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/folder/create", {
        name: folderName,
      });
      if (response.status === 201) {
        setFolderName("");
        getFolders();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <form
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onSubmit={handleSubmit}
      >
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
            name="name"
            value={folderName}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={closeModal} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
