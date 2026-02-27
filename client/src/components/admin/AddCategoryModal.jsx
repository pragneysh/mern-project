import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddCategoryModal = ({
  setCategories,
  setIsModalOpen,
  editCategory,
}) => {
  const isEditMode = !!editCategory;

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Reset & Prefill Logic
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
      setDescription(editCategory.description || "");
      setPreview(editCategory.image || null);
    } else {
      resetForm();
    }
  }, [editCategory]);

  // ✅ Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview && imageFile) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, imageFile]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
    setNameError("");
    setDescriptionError("");
    setImageError("");
  };

  const handleClose = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setNameError("");
    setDescriptionError("");
    setImageError("");

    if (!name.trim()) {
      setNameError("Name is required");
      hasError = true;
    }

    // if (!description.trim()) {
    //   setDescriptionError("Description is required");
    //   hasError = true;
    // }

    if (!imageFile && !isEditMode) {
      setImageError("Image is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = isEditMode
        ? `http://localhost:3000/menu/update-category/${editCategory.id}`
        : "http://localhost:3000/menu/create-category";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isEditMode) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === data.id ? data : cat))
        );
      } else {
        setCategories((prev) => [...prev, data]);
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-red-600">
          {isEditMode ? "Update Category" : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {descriptionError && (
              <p className="text-red-500 text-sm mt-1">
                {descriptionError}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Category"
              : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
