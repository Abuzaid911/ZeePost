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
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white/90 dark:bg-dark-secondary/90 backdrop-blur-lg rounded-t-2xl shadow-lg border-t border-gray-200 dark:border-gray-700 flex justify-around py-3 px-6 transition-all duration-300 ease-in-out z-50">
      {navItems.map(({ id, path, icon, label }) => (
        <Link key={id} href={path} className="group relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-primary/50 transition-all duration-300">
          <div
            className={`flex flex-col items-center space-y-1.5 transition-all duration-300 ease-in-out ${router.pathname === path ? "text-teal-400 dark:text-teal-300 translate-y-[-4px]" : "text-gray-600 dark:text-gray-400 hover:text-teal-400 dark:hover:text-teal-300"}`}
          >
            <span className={`text-2xl transition-transform duration-300 ${router.pathname === path ? "scale-110" : "group-hover:scale-105"}`}>
              {icon}
            </span>
            <span className={`text-xs font-medium transition-opacity duration-300 ${router.pathname === path ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              {label}
            </span>
            {router.pathname === path && (
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 dark:bg-teal-300 rounded-full shadow-lg shadow-teal-400/20 dark:shadow-teal-300/20" />
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;