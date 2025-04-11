import Link from "next/link";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="w-64 bg-custom_gray-100 h-screen p-5">
      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-custom_green-500 hover:text-custom_green-500 hover:font-extrabold font-inter"
        >
          <HomeIcon className="h-6 w-6 " />
          <span>Home</span>
        </Link>
        <Link
          href="/blog"
          className="flex items-center space-x-2 text-custom_green-500 hover:text-custom_green-500 hover:font-extrabold font-inter"
        >
          <PencilSquareIcon className="h-6 w-6" />
          <span>Our Blog</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
