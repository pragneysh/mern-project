import { useState, useEffect } from "react";
import axios from "axios";

import LayoutHeader from "./LayoutHeader";
import LayoutFloor from "./LayoutFloor";
import TableModal from "./TableModal";

import ConfirmModal from "../../common/ConfirmModal";
import Toast from "../../common/Toast";

export default function LayoutEditor() {
  const [tables, setTables] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [deleteTable, setDeleteTable] = useState(null);
  const [confirmSaveLayout, setConfirmSaveLayout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const defaultTable = {
    table_number: "",
    type: "square",
    capacity: 2,
    isActive: true,
  };

  const [newTable, setNewTable] = useState(defaultTable);

  // FETCH TABLES
  const fetchTables = async () => {
    const res = await axios.get("http://localhost:3000/tables");

    const formatted = res.data.map((t) => ({
      id: t.id,
      name: t.tableNumber,
      type: t.shape,
      capacity: t.capacity,
      isActive: t.isActive,
      x: t.positionX,
      y: t.positionY,
    }));

    setTables(formatted);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // UPDATE POSITION
  const updatePosition = (id, x, y) => {
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
  };

  // ADD / UPDATE
  const handleSaveTable = async () => {
    if (!newTable.table_number) return;

    if (editingTable) {
      await axios.patch(
        `http://localhost:3000/tables/${editingTable}/position`,
        {
          tableNumber: newTable.table_number,
          shape: newTable.type,
          capacity: newTable.capacity,
          isActive: newTable.isActive,
        },
      );
    } else {
      await axios.post("http://localhost:3000/tables", {
        tableNumber: newTable.table_number,
        shape: newTable.type,
        capacity: newTable.capacity,
        positionX: 100,
        positionY: 100,
        isActive: newTable.isActive,
      });
    }

    fetchTables();
    setShowModal(false);
    setEditingTable(null);
    setNewTable(defaultTable);
  };

  // EDIT
  const handleEdit = (table) => {
    setEditingTable(table.id);

    setNewTable({
      table_number: table.name,
      type: table.type,
      capacity: table.capacity,
      isActive: table.isActive,
    });

    setShowModal(true);
  };

  // DELETE
  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/tables/${deleteTable}`);
    fetchTables();
    setDeleteTable(null);
  };

  // SAVE LAYOUT
  const saveLayout = async () => {
    try {
      console.log(tables);

      (await axios.patch("http://localhost:3000/tables/layout", {
        tables,
      }),
        setConfirmSaveLayout(false));
      setShowSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <LayoutHeader
        onAdd={() => {
          setNewTable(defaultTable);
          setEditingTable(null);
          setShowModal(true);
        }}
        onSaveLayout={() => setConfirmSaveLayout(true)}
      />

      <LayoutFloor
        tables={tables}
        updatePosition={updatePosition}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteTable(id)}
        width={"full"}
        height={"600px"}
      />

      <TableModal
        show={showModal}
        editingTable={editingTable}
        newTable={newTable}
        setNewTable={setNewTable}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTable}
      />

      <ConfirmModal
        isOpen={!!deleteTable}
        title="Delete Table"
        message={
          deleteTable && (
            <>
              Are you sure you want to delete <b>{deleteTable}</b>?
            </>
          )
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTable(null)}
      />

      <ConfirmModal
        isOpen={confirmSaveLayout}
        title="Save Layout"
        message={
          <>
            Are you sure you want to <b>save the table layout</b>?
          </>
        }
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={saveLayout}
        onCancel={() => setConfirmSaveLayout(false)}
      />

      <Toast
        show={showSuccess}
        message="Layout saved successfully"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
