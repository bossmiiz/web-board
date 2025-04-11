import Link from "next/link";
import {
  HomeIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 right-0 w-64 bg-custom_green-500 lg:bg-custom_gray-100 transform 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
      `}
      >
        <div className="p-5">
          <div className="flex justify-start lg:hidden mb-4">
            <button onClick={onClose}>
              <ArrowRightIcon className="h-6 w-6 text-white lg:text-custom_green-500" />
            </button>
          </div>
          <nav className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white lg:text-custom_green-500 hover:text-gray-100 hover:font-extrabold font-inter"
            >
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-white lg:text-custom_green-500 hover:text-gray-100 hover:font-extrabold font-inter"
            >
              <PencilSquareIcon className="h-6 w-6" />
              <span>Our Blog</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
