import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "max-w-2xl",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={`w-full ${size} rounded-2xl bg-[#121821] border border-[#2b3440]`}
      >
        <div className="flex items-center justify-between border-b border-[#2b3440] p-4">
          <h2 className="font-semibold text-white">
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
