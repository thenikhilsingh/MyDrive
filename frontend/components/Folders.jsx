import FolderCard from "../components/FolderCard";

export default function Folders() {
  const folders = [
    {
      id: 1,
      name: "Documents",
      items: 12,
    },
    {
      id: 2,
      name: "Images",
      items: 18,
    },
    {
      id: 3,
      name: "Projects",
      items: 7,
    },
    {
      id: 4,
      name: "Videos",
      items: 9,
    },
    {
      id: 5,
      name: "Work",
      items: 4,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Folders</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  );
}
