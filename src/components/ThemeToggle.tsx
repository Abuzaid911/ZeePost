import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync Dark Mode with Local Storage and System Preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
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

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const hasStoredPreference = localStorage.getItem("theme");
      if (!hasStoredPreference) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Dark Mode"
      className="relative p-2.5 rounded-full bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 hover:scale-110 hover:shadow-md dark:hover:shadow-teal-400/20 transition-all duration-300 ease-in-out"
    >
      <div className="relative w-4 h-4 transition-transform duration-300 ease-in-out transform">
        {darkMode ? (
          <IoSunnyOutline className="absolute inset-0 text-yellow-400 transition-opacity duration-300 ease-in-out" />
        ) : (
          <FaMoon className="absolute inset-0 text-gray-600 dark:text-gray-300 transition-opacity duration-300 ease-in-out" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;