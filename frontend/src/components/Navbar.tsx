import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="bg-custom_green-500 p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-white text-xl italic font-castoro font-normal"
      >
        α Board
      </Link>
      <div className="flex items-center gap-4">
        <button className="hidden lg:block bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 w-[105px] h-[40px] transition-colors font-inter">
          Sign In
        </button>
        <button 
          className="lg:hidden text-white"
          onClick={onMenuClick}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
