export default function LayoutHeader({ onAdd, onSaveLayout }) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Restaurant Layout
        </h1>
        <p className="text-gray-500 text-sm">
          Drag tables to design your restaurant floor
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow"
        >
          + Add Table
        </button>

        <button
          onClick={onSaveLayout}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
        >
          Save Layout
        </button>
      </div>
    </div>
  );
}
