import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-custom_green-500 p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-white text-xl italic font-castoro font-normal"
      >
        α Board
      </Link>
      <button className="bg-custom_success text-white px-4 py-2 rounded-md hover:bg-custom_green-300 w-[105px] h-[40px] transition-colors font-inter">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;
