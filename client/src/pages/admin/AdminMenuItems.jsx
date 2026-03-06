"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuGrid from "../../components/users/menu/MenuGrid";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import ItemModal from "../../components/admin/ItemModal";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function CategoryItemsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Fetch items
  useEffect(() => {
    fetch(`http://localhost:3000/menu/categories/${id}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setCategory(data.category);
      });
  }, [id]);

  // Create / Update
  const handleSubmit = async (formData) => {
    if (editingItem) {
      await fetch(`http://localhost:3000/menu/menu-item/${editingItem.id}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch(`http://localhost:3000/menu/create-menu-item`, {
        method: "POST",
        body: formData,
      });
    }

    const res = await fetch(
      `http://localhost:3000/menu/categories/${id}/items`
    );
    const data = await res.json();
    setItems(data.items);

    setEditingItem(null);
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteItem) return;

    await fetch(`http://localhost:3000/menu/menu-item/${deleteItem.id}`, {
      method: "DELETE",
    });

    const res = await fetch(
      `http://localhost:3000/menu/categories/${id}/items`
    );
    const data = await res.json();
    setItems(data.items);

    setDeleteItem(null);
  };

  return (
    <div className="min-h-screen sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {category.name || "Category"} Items
          </h1>
          <p className="text-sm text-gray-500">
            Manage menu items inside this category
          </p>
        </div>

        <div className="flex gap-3">

          {/* Add Item */}
          <button
            onClick={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 
                       text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <FaPlus size={13} />
            Add Item
          </button>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-gray-300 
                       hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <FaArrowLeft size={13} />
            Back
          </button>

        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">

        {items.length > 0 ? (
          <MenuGrid
            items={items}
            onEdit={(item) => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
            onDelete={(item) => {
              setDeleteItem(item);
            }}
          />
        ) : (
          <p className="text-gray-500 text-center py-10 text-sm">
            No items available in this category.
          </p>
        )}

      </div>

      {/* Item Modal */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={!!deleteItem}
        title="Delete Item"
        message={
          deleteItem
            ? `Are you sure you want to delete "${deleteItem.name}"?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteItem(null)}
      />

    </div>
  );
}