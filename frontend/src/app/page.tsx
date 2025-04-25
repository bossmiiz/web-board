"use client";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BlogCard from "@/components/BlogCard";
import CreatePostModal from "@/components/CreatePostModal";
import { getCategories, Category } from "@/services/categories.service";
import { getPosts, Post } from "@/services/posts.service";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await getCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (error) {
        setCategoriesError("Failed to load categories");
        console.error("Error loading categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true);
        const data = await getPosts();
        setPosts(data);
        setPostsError(null);
      } catch (error) {
        setPostsError("Failed to load posts");
        console.error("Error loading posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchCategories();
    fetchPosts();
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
              <div
                className={`relative transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? "w-full" : "w-auto lg:w-[512px]"
                }`}
              >
                {!isSearchExpanded && (
                  <button
                    className="lg:hidden"
                    onClick={() => setIsSearchExpanded(true)}
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-black" />
                  </button>
                )}
                <div
                  className={`relative ${
                    isSearchExpanded ? "block" : "hidden lg:block"
                  }`}
                >
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>

              <div
                className={`flex items-center space-x-4 ${
                  isSearchExpanded ? "hidden lg:flex" : "flex"
                }`}
              >
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-custom_green-500 transition-colors"
                  >
                    <span className="font-bold">Community</span>
                    <ChevronDownIcon className="h-5 w-5" />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 backdrop-blur-xs z-10 lg:hidden"
                        onClick={() => setIsDropdownOpen(false)}
                      />

                      <div className="absolute right-0 mt-2 w-[202px] lg:w-[320px] bg-white rounded-lg shadow-lg z-20">
                        <div>
                          {isLoadingCategories ? (
                            <div className="px-4 py-2 text-gray-500">
                              Loading...
                            </div>
                          ) : categoriesError ? (
                            <div className="px-4 py-2 text-red-500">
                              {categoriesError}
                            </div>
                          ) : categories.length === 0 ? (
                            <div className="px-4 py-2 text-gray-500">
                              No categories available
                            </div>
                          ) : (
                            categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => {
                                  setSelectedCategory(category.name);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full text-left"
                              >
                                <div
                                  className={`flex items-center justify-between px-4 py-2 hover:bg-custom_green-100 transition-colors ${
                                    selectedCategory === category.name
                                      ? "bg-custom_green-100 text-custom_green-500"
                                      : ""
                                  } ${
                                    category.id === categories[0].id
                                      ? "rounded-t-lg"
                                      : ""
                                  } ${
                                    category.id ===
                                    categories[categories.length - 1].id
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
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 transition-colors w-[105px] h-[40px]"
                >
                  Create +
                </button>
              </div>
            </div>

            <div>
              {isLoadingPosts ? (
                <div className="text-center py-4">Loading posts...</div>
              ) : postsError ? (
                <div className="text-center py-4 text-red-500">
                  {postsError}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-4">No posts available</div>
              ) : (
                posts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    id={post.id.toString()}
                    title={post.title}
                    excerpt={post.content.substring(0, 150) + "..."}
                    author={post.user.username}
                    category={post.category.name}
                    commentCount={0}
                    authorImage={post.user.username.charAt(0)}
                    isFirst={index === 0}
                    isLast={index === posts.length - 1}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSubmit={async () => {
          try {
            // Fetch posts again to update the list
            const updatedPosts = await getPosts();
            setPosts(updatedPosts);
            setIsCreateModalOpen(false);
          } catch (error) {
            console.error("Error updating posts:", error);
          }
        }}
      />
    </div>
  );
}
