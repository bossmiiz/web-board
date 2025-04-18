import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { getCategories, Category } from "../services/categories.service";
import { createPost } from "../services/posts.service";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  mode?: "create" | "edit";
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: {
    title: string;
    content: string;
    category: string;
  }) => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  mode = "create",
  initialTitle = "",
  initialContent = "",
  onSubmit,
}: CreatePostModalProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
      fetchCategories();
    }
  }, [isOpen, initialTitle, initialContent]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error loading categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Find the category ID based on the selected category name
      const selectedCategoryObj = categories.find(
        (cat) => cat.name === selectedCategory
      );

      if (!selectedCategoryObj) {
        setError("Please select a valid category");
        return;
      }

      // Call the backend API to create the post
      await createPost({
        title,
        content,
        categoryId: selectedCategoryObj.id,
      });

      // Call the parent component's onSubmit handler
      onSubmit({
        title,
        content,
        category: selectedCategory,
      });

      // Reset form and close modal
      setTitle("");
      setContent("");
      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-[343px] h-[580px] md:w-[685px] md:h-[510px] bg-white rounded-[20px] overflow-hidden">
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-medium text-[#191919]">
              {mode === "create" ? "Create Post" : "Edit Post"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-6 w-6 text-[#939494]" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4 md:mb-6 relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="inline-flex w-full md:w-[195px] items-center justify-between px-4 py-2 text-sm text-custom_success bg-white border border-custom_success rounded-lg transition-colors"
            >
              <span className="truncate">
                {selectedCategory || "Choose a community"}
              </span>
              <ChevronDownIcon className="h-4 w-4 ml-2 flex-shrink-0 text-custom_success" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full md:w-[320px] bg-white border border-custom_gray-100 rounded-lg shadow-lg z-20">
                {isLoading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Loading categories...
                  </div>
                ) : error ? (
                  <div className="px-4 py-2 text-sm text-red-500">{error}</div>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.name);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left"
                    >
                      <div
                        className={`flex items-center justify-between px-4 py-2 hover:bg-custom_green-100 transition-colors ${
                          selectedCategory === category.name
                            ? "bg-custom_green-100 text-custom_green-500"
                            : ""
                        } ${
                          category.id === categories[0]?.id
                            ? "rounded-t-lg"
                            : ""
                        } ${
                          category.id === categories[categories.length - 1]?.id
                            ? "rounded-b-lg"
                            : ""
                        }`}
                      >
                        <span>{category.name}</span>
                        {selectedCategory === category.name && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-custom_green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 md:mb-4 border border-gray-200 rounded-lg text-base placeholder:text-[#939494] focus:outline-none focus:ring-1 focus:ring-custom_success"
          />

          <textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-base placeholder:text-[#939494] mb-4 md:mb-6 min-h-[200px] focus:outline-none focus:ring-1 focus:ring-custom_success resize-none"
          />

          <div className="flex flex-col md:flex-row md:justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full md:w-[105px] h-[40px] px-4 py-2 text-sm text-custom_success border border-custom_success rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full md:w-[105px] h-[40px] px-4 py-2 text-sm bg-custom_success text-white rounded-lg hover:bg-[#2b5f44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                !title.trim() ||
                !content.trim() ||
                !selectedCategory ||
                isSubmitting
              }
            >
              {isSubmitting
                ? "Submitting..."
                : mode === "create"
                ? "Post"
                : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
