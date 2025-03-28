import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import NoSSR from "./NoSSR";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import ThemeToggle from './ThemeToggle';

function NavTop() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [menuOpen]);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        {/* ✅ Logo */}
        <Link href="/" className="text-3xl font-bold transition-all tracking-wide">
          <span className="text-teal-400 font-mono hover:scale-105 transition-transform">ZeePost</span>
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {["/", "/new", "/about"].map((path) => (
            <Link
              key={path}
              href={path}
              className={`relative group transition-all ${
                router.pathname === path ? "text-teal-400" : "text-gray-700 hover:text-teal-400"
              }`}
            >
              {path === "/" ? "Home" : path === "/new" ? "New Post" : "About"}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* ✅ Right Section - Authentication */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <NoSSR>
            {/* ✅ Loading State */}
            {status === "loading" && <span className="loading loading-spinner text-teal-400"></span>}

            {/* ✅ Not Authenticated - Login Buttons */}
            {status === "unauthenticated" && (
              <div className="hidden md:flex space-x-2">
                <button
                  aria-label="Sign in with Google"
                  className="p-2.5 bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-full hover:scale-110 hover:shadow-md dark:hover:shadow-teal-400/20 transition-all duration-300 ease-in-out"
                  onClick={() => signIn("google")}
                >
                  <GoogleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  aria-label="Sign in with GitHub"
                  className="p-2.5 bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-full hover:scale-110 hover:shadow-md dark:hover:shadow-teal-400/20 transition-all duration-300 ease-in-out"
                  onClick={() => signIn("github")}
                >
                  <GithubIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}

            {/* ✅ Authenticated User - Profile Dropdown */}
            {status === "authenticated" && session?.user?.image && (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-400 dark:hover:text-teal-300 transition-all duration-300 ease-in-out font-medium"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <img
                    src={session.user.image}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-teal-400 dark:hover:border-teal-300 transition-all duration-300 ease-in-out"
                  />
                </button>

                {/* ✅ Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-dark-secondary shadow-xl dark:shadow-teal-400/10 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
                    <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                      <FaUserCircle className="text-gray-700 dark:text-gray-300 text-lg mr-2" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{session.user.name}</span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full text-left p-3 text-red-500 hover:bg-gray-100 dark:hover:bg-dark-primary/50 rounded-b-lg transition-all duration-300 ease-in-out"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </NoSSR>

          {/* ✅ Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300"
        >
          {["/", "/new", "/about"].map((path) => (
            <Link
              key={path}
              href={path}
              className="block text-gray-800 text-lg px-6 py-4 border-b border-gray-200 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {path === "/" ? "Home" : path === "/new" ? "New Post" : "About"}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          {status === "unauthenticated" && (
            <div className="flex justify-center space-x-4 py-4">
              <button
                aria-label="Sign in with Google"
                className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-all"
                onClick={() => signIn("google")}
              >
                <GoogleIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button
                aria-label="Sign in with GitHub"
                className="p-3 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-all"
                onClick={() => signIn("github")}
              >
                <GithubIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavTop;