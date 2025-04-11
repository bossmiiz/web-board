"use client";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BlogCard from "@/components/BlogCard";

const categories = [
  { id: 1, name: "History" },
  { id: 2, name: "Food" },
  { id: 3, name: "Pets" },
  { id: 4, name: "Health" },
  { id: 5, name: "Fashion" },
  { id: 6, name: "Exercise" },
  { id: 7, name: "Others" },
];

const dummyPosts = [
  {
    id: "1",
    title: "The Beginning of the End of the World",
    excerpt:
      "The afterlife sitcom The Good Place comes to its culmination, the show's two protagonists, Eleanor and Chidi, contemplate their future...",
    author: "Wittawat",
    category: "History",
    commentCount: 32,
    authorImage: "/default-avatar.png",
  },
  {
    id: "2",
    title: "The Mental Health Benefits of Exercise",
    excerpt:
      "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
    author: "Nicholas",
    category: "Exercise",
    commentCount: 32,
    authorImage: "/default-avatar.png",
  },
];

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
                      {/* Overlay for mobile */}
                      <div className="fixed inset-0 backdrop-blur-xs z-10 lg:hidden" onClick={() => setIsDropdownOpen(false)} />
                      
                      <div className="absolute right-0 mt-2 w-[202px] lg:w-[320px] bg-white rounded-lg shadow-lg z-20">
                        <div>
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.name);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left"
                            >
                              <div className={`flex items-center justify-between px-4 py-2 hover:bg-custom_green-100 transition-colors ${
                                selectedCategory === category.name
                                  ? "bg-custom_green-100 text-custom_green-500"
                                  : ""
                              } ${
                                category.id === 1 ? "rounded-t-lg" : ""
                              } ${
                                category.id === categories.length ? "rounded-b-lg" : ""
                              }`}>
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
                <button className="bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 transition-colors w-[105px] h-[40px]">
                  Create +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {dummyPosts.map((post, index) => (
                <BlogCard 
                  key={index} 
                  {...post} 
                  isFirst={index === 0}
                  isLast={index === dummyPosts.length - 1}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
