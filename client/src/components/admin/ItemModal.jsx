import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ItemModal({ isOpen, onClose, onSubmit, initialData }) {
  const isEditMode = !!initialData;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // ================= Prefill / Reset =================
  useEffect(() => {
    if (!isOpen) return;

    const fetchItemDetails = async () => {
      if (!initialData?.id) {
        resetForm();

        const pathname = window.location.pathname;
        const segments = pathname.split("/").filter(Boolean);
        const idFromUrl = segments[segments.length - 1];

        if (idFromUrl) setCategoryId(idFromUrl);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/menu/menu-item/${initialData.id}`,
        );

        const data = await response.json();
        if (!response.ok) return;

        setName(data.name || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setRating(data.rating || 0);
        setPreview(data.image || null);
        setCategoryId(String(data.category.id || ""));
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItemDetails();
  }, [initialData, isOpen]);

  // ================= Fetch categories =================
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu/categories");
        const data = await response.json();

        if (!response.ok) return;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (preview && imageFile) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, imageFile]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setRating(4.5);
    setImageFile(null);
    setPreview(null);
    setCategoryId("");
    setNameError("");
    setPriceError("");
    setImageError("");
    setCategoryError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setNameError("");
    setPriceError("");
    setImageError("");
    setCategoryError("");

    if (!name.trim()) {
      setNameError("Item name is required");
      hasError = true;
    }

    if (!price) {
      setPriceError("Price is required");
      hasError = true;
    }

    if (!imageFile && !isEditMode) {
      setImageError("Image is required");
      hasError = true;
    }

    if (!categoryId) {
      setCategoryError("Category is required");
      hasError = true;
    }

    if (hasError) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("price", price);
      formData.append("description", description.trim());
      formData.append("rating", rating);
      formData.append("categoryId", categoryId);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Shake Animation */}
      <style>
        {`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }

        .shake {
          animation: shake 0.35s;
        }
        `}
      </style>

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Update Menu Item" : "Add New Item"}
            </h2>

            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="overflow-y-auto px-6 py-5 space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 w-full border rounded-lg px-3 py-2 outline-none
                ${nameError ? "border-red-500" : "border-gray-300"}
                ${shake && nameError ? "shake" : ""}
                focus:ring-2 focus:ring-orange-400`}
              />
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`mt-1 w-full border rounded-lg px-3 py-2
                ${categoryError ? "border-red-500" : "border-gray-300"}
                ${shake && categoryError ? "shake" : ""}
                focus:ring-2 focus:ring-orange-400`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-xs mt-1">{categoryError}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`mt-1 w-full border rounded-lg px-3 py-2
                ${priceError ? "border-red-500" : "border-gray-300"}
                ${shake && priceError ? "shake" : ""}
                focus:ring-2 focus:ring-orange-400`}
              />
              {priceError && (
                <p className="text-red-500 text-xs mt-1">{priceError}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm text-gray-600">Rating</label>
              <input
                type="number"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm text-gray-600">Item Image</label>

              <label
                className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-6 cursor-pointer transition
                ${imageError ? "border-red-500" : "border-gray-300"}
                ${shake && imageError ? "shake" : ""}
                hover:bg-gray-50`}
              >
                <span className="text-gray-500 text-sm">
                  Click to upload image
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imageError && (
                <p className="text-red-500 text-xs mt-1">{imageError}</p>
              )}
            </div>

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* FOOTER */}
          <div className="border-t px-6 py-4 bg-white">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Item"
                : "Create Item"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}