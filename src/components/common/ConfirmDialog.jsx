import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  return (
    <Modal
      isOpen={open}
      onClose={onCancel}
      title={title}
      size="max-w-md"
    >
      <p className="text-slate-300">
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-600 px-4 py-2"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          className={`rounded-lg px-4 py-2 text-white ${
            danger
              ? "bg-red-600"
              : "bg-sky-600"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}