import { useEffect, useState } from "react";
import FolderCard from "../components/FolderCard";
import useAxios from "../src/hooks/useAxios";

export default function Folders() {
  const api = useAxios();
  const [folders, setFolders] = useState([]);

  const getFolders = async () => {
    try {
      const response = await api.get("/api/folder/");
      setFolders(response.data.allFolders);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Folders</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {folders.map((folder) => (
          <FolderCard key={folder._id} folder={folder} />
        ))}
      </div>
    </div>
  );
}
