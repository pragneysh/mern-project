export default function TableModal({
  show,
  editingTable,
  newTable,
  setNewTable,
  onClose,
  onSave,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            {editingTable ? "Edit Table" : "Add Table"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* TABLE NUMBER */}
          <div>
            <label className="text-sm text-gray-600">Table Number</label>
            <input
              type="text"
              placeholder="e.g. T1"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={newTable.table_number}
              onChange={(e) =>
                setNewTable({
                  ...newTable,
                  table_number: e.target.value,
                })
              }
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600">Table Type</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={newTable.type}
              onChange={(e) =>
                setNewTable({
                  ...newTable,
                  type: e.target.value,
                })
              }
            >
              <option value="square">Square</option>
              <option value="round">Round</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* CAPACITY */}
          <div>
            <label className="text-sm text-gray-600">Capacity</label>
            <input
              type="number"
              placeholder="Number of seats"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable({
                  ...newTable,
                  capacity: Number(e.target.value),
                })
              }
            />
          </div>

          {/* ACTIVE */}
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={newTable.isActive}
              onChange={(e) =>
                setNewTable({
                  ...newTable,
                  isActive: e.target.checked,
                })
              }
            />
            Active
          </label>
        </div>

        {/* FOOTER */}
        <div className="border-t p-5">
          <button
            onClick={onSave}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition"
          >
            {editingTable ? "Update Table" : "Create Table"}
          </button>
        </div>
      </div>
    </div>
  );
}
