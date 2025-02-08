import { useRouter } from "next/router";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

const navItems = [
    { id: "home", path: "/", icon: <FaHome className="text-xl" />, label: "Home" },
    { id: "add", path: "/new", icon: <FaPlus className="text-xl" />, label: "Add" },
    { id: "about", path: "/about", icon: <FaUser className="text-xl" />, label: "About" }
];

function Nav({ active }: { active: string }) {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);

    // Check user's system preference for dark mode
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white dark:bg-gray-900 shadow-md py-3 border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className={`flex flex-col items-center px-4 py-2 transition-all duration-300 
                                ${active === item.id 
                                    ? "text-green-400 font-bold border-b-4 border-green-600 scale-110" 
                                    : "text-gray-500 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"}`}
                >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default Nav;