import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-in fade-in zoom-in-95">

        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
            <AlertTriangle size={22} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800">
          {title}
        </h2>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-gray-500 mt-2 leading-relaxed">
            {message}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 my-5" />

        {/* Buttons */}
        <div className="flex justify-center gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 transition font-medium text-gray-600"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition font-medium shadow-sm"
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}