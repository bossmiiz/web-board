import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <nav className="bg-custom_green-500 p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-white text-xl italic font-castoro font-normal"
      >
        α Board
      </Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-white hidden lg:block">{username}</span>
            <button 
              onClick={logout}
              className="hidden lg:block bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 w-[105px] h-[40px] transition-colors font-inter"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden lg:block bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 w-[105px] h-[40px] transition-colors font-inter"
          >
            Sign In
          </Link>
        )}
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
