import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

import { getCategories } from "../data/menuData";
import SearchBar from "../components/users/menu/SearchBar";
import CategoryList from "../components/users/menu/CategoryList";
import MenuGrid from "../components/users/menu/MenuGrid";
import ItemModal from "../components/admin/ItemModal";
import ConfirmModal from "../components/common/ConfirmModal";

const BASE_URL = "http://localhost:3000";

export default function Menu() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // Fetch Categories
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // Sync category from URL
  // =========================
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setCategory(categoryParam || "All");
  }, [searchParams]);

  // =========================
  // Handle Category Change
  // =========================
  const handleCategoryChange = (selectedCategory) => {
    if (!selectedCategory || selectedCategory === "All") {
      navigate("/menu");
    } else {
      navigate(`/menu?category=${selectedCategory}`);
    }
  };

  // =========================
  // Fetch Menu Items
  // =========================
  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url =
        !category || category === "All"
          ? `${BASE_URL}/menu/menu-items`
          : `${BASE_URL}/menu/categories/${category}/items`;

      const response = await axios.get(url);

      const items =
        response.data?.items || response.data?.data || response.data || [];

      setMenuItems(items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // =========================
  // Filtered Items
  // =========================
  const filteredItems = menuItems.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================
  // Create / Update Submit
  // =========================
  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await fetch(`${BASE_URL}/menu/menu-item/${editingItem.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        await fetch(`${BASE_URL}/menu/create-menu-item`, {
          method: "POST",
          body: formData,
        });
      }

      setIsModalOpen(false);
      setEditingItem(null);

      await fetchMenuItems(); // Refresh list
    } catch (err) {
      console.error("Error submitting item:", err);
    }
  };

  // =========================
  // Delete Item
  // =========================
  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await fetch(`${BASE_URL}/menu/menu-item/${deleteItem.id}`, {
        method: "DELETE",
      });

      setDeleteItem(null);
      await fetchMenuItems(); // Refresh list
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <SearchBar search={search} setSearch={setSearch} />

      <CategoryList
        categories={categories}
        category={category}
        setCategory={handleCategoryChange}
      />

      {loading && (
        <p className="text-center text-gray-500 mt-6">Loading menu...</p>
      )}

      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {!loading && !error && (
        <MenuGrid
          items={filteredItems}
          onEdit={(item) => {
            setEditingItem(item);
            setIsModalOpen(true);
          }}
          onDelete={(item) => {
            setDeleteItem(item);
          }}
        />
      )}

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />

      <ConfirmModal
        isOpen={!!deleteItem}
        title="Delete Item"
        message={
          deleteItem
            ? `Are you sure you want to delete ${deleteItem.name}?`
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
