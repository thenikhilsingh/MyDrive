import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../src/hooks/useAxios";
import { useState } from "react";

export default function FolderCard({ folder }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/folder/${folder._id}`)}
      className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition"
    >
      <Folder size={50} className="text-yellow-400 fill-yellow-300" />

      <h3 className="font-medium mt-3">{folder.name}</h3>

      {/* <p className="text-sm text-gray-500"> items</p> */}
    </div>
  );
}
