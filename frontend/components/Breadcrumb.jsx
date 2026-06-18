import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className={
              index === items.length - 1 ? "text-gray-600" : "text-blue-600"
            }
          >
            {item}
          </span>

          {index !== items.length - 1 && <ChevronRight size={15} />}
        </div>
      ))}
    </div>
  );
}
