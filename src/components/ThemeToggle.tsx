import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync Dark Mode with Local Storage and System Preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Default to light mode even if system prefers dark
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Dark Mode"
      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full hover:scale-105 transition-all"
    >
      {darkMode ? (
        <FaSun className="text-yellow-100 text-xl" />
      ) : (
        <FaMoon className="text-gray-600 dark:text-gray-300 text-xl" />
      )}
      {/* <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
        {darkMode ? "Dark Mode" : "Dark Mode"}
      </span> */}
    </button>
  );
};

export default ThemeToggle;