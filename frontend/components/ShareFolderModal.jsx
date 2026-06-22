import { useState } from "react";
import { X } from "lucide-react";
import useAxios from "../src/hooks/useAxios";

export default function ShareFolderModal({ folderId, closeModal }) {
  const api = useAxios();

  const [duration, setDuration] = useState(1);
  const [shareLink, setShareLink] = useState("");

  const generateLink = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/api/folder/share/${folderId}`, {
        duration,
      });

      setShareLink(response.data.shareLink);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <form
        onSubmit={generateLink}
        className="bg-white p-6 rounded-xl w-full max-w-md"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Share Folder</h2>

          <button type="button" onClick={closeModal}>
            <X />
          </button>
        </div>

        <div className="mt-5">
          <label className="block mb-2">Duration (Days)</label>

          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg"
        >
          Generate Link
        </button>

        {shareLink && (
          <div className="mt-5">
            <input
              value={shareLink}
              readOnly
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="button"
              onClick={copyLink}
              className="w-full mt-3 border py-3 rounded-lg"
            >
              Copy Link
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
