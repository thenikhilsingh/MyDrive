import { FileText, Folder, RotateCcw, Trash2 } from "lucide-react";

export default function Trash() {
  const deletedItems = [
    {
      id: 1,
      type: "file",
      name: "Resume.pdf",
      deletedAt: "16 Jun 2026",
    },
    {
      id: 2,
      type: "folder",
      name: "Old Project",
      deletedAt: "15 Jun 2026",
    },
    {
      id: 3,
      type: "file",
      name: "Notes.docx",
      deletedAt: "14 Jun 2026",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Trash</h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {deletedItems.map((item) => (
          <div
            key={item.id}
            className="border-b last:border-none p-4 flex flex-col md:flex-row justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              {item.type === "folder" ? (
                <Folder className="text-yellow-500" />
              ) : (
                <FileText className="text-red-500" />
              )}

              <div>
                <h3 className="font-medium">{item.name}</h3>

                <p className="text-sm text-gray-500">
                  Deleted: {item.deletedAt}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                <RotateCcw size={16} />
                Restore
              </button>

              <button className="border border-red-300 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
