import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

const AddCategoryModal = ({ setCategories, setIsModalOpen, editCategory }) => {
  const isEditMode = !!editCategory;

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
      setDescription(editCategory.description || "");
      setPreview(editCategory.image || null);
    } else {
      resetForm();
    }
  }, [editCategory]);

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
      setNameError("Category name is required");
      hasError = true;
    }

    if (!imageFile && !isEditMode) {
      setImageError("Image is required");
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
          prev.map((cat) => (cat.id === data.id ? data : cat)),
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

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Update Category" : "Add New Category"}
            </h2>

            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="overflow-y-auto px-6 py-5 space-y-4">
            
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Category Name
              </label>

              <input
                type="text"
                placeholder="e.g. Pizza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition
                ${nameError ? "border-red-500" : "border-gray-300"}
                ${shake && nameError ? "shake" : ""}
                focus:ring-2 focus:ring-orange-400`}
              />

              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Description
              </label>

              <textarea
                rows="3"
                placeholder="Short description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg outline-none transition
                ${descriptionError ? "border-red-500" : "border-gray-300"}
                ${shake && descriptionError ? "shake" : ""}
                focus:ring-2 focus:ring-orange-400`}
              />

              {descriptionError && (
                <p className="text-red-500 text-xs mt-1">{descriptionError}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Category Image
              </label>

              <label
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer transition
                ${imageError ? "border-red-500" : "border-gray-300"}
                ${shake && imageError ? "shake" : ""}
                hover:border-orange-400`}
              >
                <Upload size={18} />
                <span className="text-sm text-gray-500">
                  Click to upload image
                </span>

                <input
                  type="file"
                  accept="image/*"
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
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;