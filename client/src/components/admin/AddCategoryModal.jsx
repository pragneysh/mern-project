import { useState } from "react";
import { X } from "lucide-react";

const AddCategoryModal = ({ setCategories, setIsModalOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setImageError("");
    setNameError("");

    // Validation
    if (!name || name.trim() === "") {
      setNameError("Name is required");
      hasError = true;
    }

    if (!description || description.trim() === "") {
      setDescriptionError("Description is required");
      hasError = true;
    }

    if (!imageFile) {
      setImageError("Image is required");
      hasError = true;
    }

    // Stop if any error exists
    if (hasError) return;

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("image", imageFile);

    // If no errors → proceed
    const response = await fetch("http://localhost:3000/menu/create-category", {
      method: "POST",
      body: formData,
    });
    

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }

    const data = await response.json();
    setCategories((prev) => [...prev, data]);

    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-red-600">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

          {/* Description */}
          <textarea
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

          {/* Image Preview */}
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
          
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
