import { useState, useEffect } from "react";
import CategoryGrid from "../../components/admin/CategoryGrid";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import ConfirmModal from "../../components/common/ConfirmModal";

const AdminMenu = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null); // ✅ for confirm modal
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Actual Delete
  const handleDelete = async () => {
    if (!deleteCategory) return;

    try {
      const response = await fetch(
        `http://localhost:3000/menu/delete-category/${deleteCategory.id}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw new Error("Delete failed");

      setCategories((prev) =>
        prev.filter((cat) => cat.id !== deleteCategory.id),
      );

      setDeleteCategory(null); // close modal
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Menu Categories
          </h1>
          <p className="text-sm text-gray-500">
            Manage your restaurant menu categories
          </p>
        </div>

        <button
          onClick={() => {
            setEditCategory(null);
            setIsModalOpen(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Add Category
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading categories...</p>
        ) : (
          <CategoryGrid
            categories={categories}
            onEdit={(category) => {
              setEditCategory(category);
              setIsModalOpen(true);
            }}
            onDelete={(category) => setDeleteCategory(category)} // ✅ open modal
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddCategoryModal
          setCategories={setCategories}
          setIsModalOpen={setIsModalOpen}
          editCategory={editCategory}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteCategory}
        title="Delete Category"
        message={
          deleteCategory && (
            <>
              Are you sure you want to delete <b>{deleteCategory.name}</b>?
            </>
          )
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteCategory(null)}
      />
    </div>
  );
};

export default AdminMenu;
