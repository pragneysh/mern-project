import { useEffect } from "react";

export default function Toast({ message, show, onClose, type = "success" }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const borderColor =
    type === "success"
      ? "border-orange-500"
      : type === "error"
        ? "border-red-500"
        : "border-blue-500";

  const dotColor =
    type === "success"
      ? "bg-orange-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  return (
    <div
      className="fixed bottom-6 right-6 z-50 bg-white shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 border-l-4 animate-fade-in"
      style={{}}
    >
      <div className={`w-2 h-2 rounded-full ${dotColor}`} />

      <p className="text-sm font-medium text-gray-700">{message}</p>
    </div>
  );
}
