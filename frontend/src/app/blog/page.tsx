"use client";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreatePostModal from "@/components/CreatePostModal";

const categories = [
  { id: 1, name: "History" },
  { id: 2, name: "Food" },
  { id: 3, name: "Pets" },
  { id: 4, name: "Health" },
  { id: 5, name: "Fashion" },
  { id: 6, name: "Exercise" },
  { id: 7, name: "Others" },
] as const;

const dummyPosts = [
  {
    id: "1",
    title: "The Beginning of the End of the World",
    excerpt:
      "The afterlife sitcom The Good Place comes to its culmination, the show's two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer...",
    author: "Jessica",
    category: "History",
    commentCount: 32,
    authorImage: "/images/avatar.jpg",
  },
  {
    id: "2",
    title: "The Power of Pets",
    excerpt:
      "Nothing compares to the joy of coming home to a loyal companion. The unconditional love of a pet can do more than keep you company. Pets may also decrease stress, improve heart health, and even help children with their emotional and social skills.",
    author: "Jessica",
    category: "Pets",
    commentCount: 1,
    authorImage: "/images/avatar.jpg",
  },
] as const;

const SearchBar = memo(
  ({
    isExpanded,
    onExpandClick,
  }: {
    isExpanded: boolean;
    onExpandClick: () => void;
  }) => (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isExpanded ? "w-full" : "w-auto lg:w-[512px]"
      }`}
    >
      {!isExpanded && (
        <button className="lg:hidden" onClick={onExpandClick}>
          <MagnifyingGlassIcon className="h-5 w-5 text-black" />
        </button>
      )}
      <div className={`relative ${isExpanded ? "block" : "hidden lg:block"}`}>
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100"
        />
      </div>
    </div>
  )
);

SearchBar.displayName = "SearchBar";

const CategoryDropdown = memo(
  ({
    isOpen,
    selectedCategory,
    onToggle,
    onSelect,
  }: {
    isOpen: boolean;
    selectedCategory: string;
    onToggle: () => void;
    onSelect: (category: string) => void;
  }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-custom_green-500 transition-colors"
      >
        <span className="font-bold">Community</span>
        <ChevronDownIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-xs z-10 lg:hidden"
            onClick={onToggle}
          />
          <div className="absolute right-0 mt-2 w-[202px] lg:w-[320px] bg-white rounded-lg shadow-lg z-20">
            <div>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelect(category.name);
                    onToggle();
                  }}
                  className="w-full text-left"
                >
                  <div
                    className={`flex items-center justify-between px-4 py-2 hover:bg-custom_green-100 transition-colors ${
                      selectedCategory === category.name
                        ? "bg-custom_green-100 text-custom_green-500"
                        : ""
                    } ${category.id === 1 ? "rounded-t-lg" : ""} ${
                      category.id === categories.length ? "rounded-b-lg" : ""
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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
);

CategoryDropdown.displayName = "CategoryDropdown";

export default function BlogPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleEdit = useCallback((id: string) => {
    console.log("Edit post:", id);
  }, []);

  const handleDelete = useCallback((id: string) => {
    console.log("Delete post:", id);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-6 bg-custom_gray-100 min-h-[calc(100vh-64px)]">
          <div className="max-w-5xl mx-auto">
            <div
              className="flex justify-between items-center mb-6 relative"
              ref={searchRef}
            >
              <SearchBar
                isExpanded={isSearchExpanded}
                onExpandClick={() => setIsSearchExpanded(true)}
              />

              <div
                className={`flex items-center space-x-4 ${
                  isSearchExpanded ? "hidden lg:flex" : "flex"
                }`}
              >
                <CategoryDropdown
                  isOpen={isDropdownOpen}
                  selectedCategory={selectedCategory}
                  onToggle={toggleDropdown}
                  onSelect={handleCategorySelect}
                />
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 transition-colors w-[105px] h-[40px]"
                >
                  Create +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {dummyPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  {...post}
                  isFirst={index === 0}
                  isLast={index === dummyPosts.length - 1}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}
