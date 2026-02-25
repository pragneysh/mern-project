import { useState, useEffect } from "react";
import CategoryGrid from "../../components/admin/CategoryGrid";
import AddCategoryModal from "../../components/admin/AddCategoryModal";

const AdminMenu = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu/categories"); // your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // assuming backend returns [{name, image, ...}, ...]
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">
          🍽 Menu Categories
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryGrid categories={categories} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <AddCategoryModal
          setCategories={setCategories}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default AdminMenu;