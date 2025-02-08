import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from "react-icons/fa";

const navItems = [
  { id: "home", path: "/", icon: <FaHome />, label: "Home" },
  { id: "search", path: "/search", icon: <FaSearch />, label: "Search" },
  { id: "add", path: "/new", icon: <FaPlusSquare />, label: "Add" },
  { id: "favorites", path: "/favorites", icon: <FaHeart />, label: "Favorites" },
  { id: "profile", path: "/profile", icon: <FaUser />, label: "Profile" },
];

function BottomNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-black/80 dark:bg-gray-900/80 backdrop-blur-md rounded-t-xl shadow-lg border-t border-purple-500 flex justify-around py-3 px-6">
      {navItems.map(({ id, path, icon }) => (
        <Link key={id} href={path} className="group">
          <div
            className={`flex flex-col items-center text-gray-500 transition-all duration-300 ${
              router.pathname === path ? "text-purple-400 scale-110" : "hover:text-white"
            }`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;