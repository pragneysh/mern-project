import { useState, useEffect } from "react";
import CategoryGrid from "../../components/admin/CategoryGrid";
import AddCategoryModal from "../../components/admin/AddCategoryModal";

const AdminMenu = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // ✅ NEW
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
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

  // ✅ Delete Handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    console.log("Deleting category with ID:", id);

    try {
      const response = await fetch(`http://localhost:3000/menu/delete-category/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }else{
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      }


    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">
          🍽 Menu Categories
        </h1>

        <button
          onClick={() => {
            setEditCategory(null); // ✅ Important (Create mode)
            setIsModalOpen(true);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryGrid
          categories={categories}
          onEdit={(category) => {
            setEditCategory(category);   // ✅ Set edit data
            setIsModalOpen(true);        // ✅ Open modal
          }}
          onDelete={handleDelete}       // ✅ Pass delete
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <AddCategoryModal
          setCategories={setCategories}
          setIsModalOpen={setIsModalOpen}
          editCategory={editCategory}   // ✅ Pass edit data
        />
      )}
    </div>
  );
};

export default AdminMenu;