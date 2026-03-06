import { useState, useEffect } from "react";
import { ORDER_STATUSES } from "../../../config/orderStatus";

export default function StatusDropdown({
  value,
  orderId = null,
  onChange,
  placeholder = "All Status",
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const current = ORDER_STATUSES.find((s) => s.value === value);
  const Icon = current?.icon;

  const handleSelect = (status) => {
    if (onChange) {
      // if orderId exists → update order
      if (orderId) {
        onChange(orderId, status.value);
      } 
      // otherwise → filter
      else {
        onChange(status.value);
      }
    }

    setOpen(false);
  };

  return (
    <div
      className="relative w-44"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Selected */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm hover:border-gray-300"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} />}
          {current?.label || placeholder}
        </div>

        <span
          className={`text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
          {/* Filter Option */}
          {!orderId && (
            <button
              onClick={() => handleSelect({ value: "", label: "All" })}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              All Status
            </button>
          )}

          {ORDER_STATUSES.map((status) => {
            const Icon = status.icon;

            return (
              <button
                key={status.value}
                onClick={() => handleSelect(status)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Icon size={14} />

                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${status.color}`}
                >
                  {status.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
