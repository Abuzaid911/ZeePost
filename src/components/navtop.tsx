import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import NoSSR from "./NoSSR";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";
import ThemeToggle from "./ThemeToggle";
import { FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";

function NavTop() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700 transition-all duration-300 relative">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text tracking-wide">
          ZeePost
        </Link>

        {/* Right Section - Theme Toggle & Authentication */}
        <div className="flex items-center space-x-4">
          
          {/* Dark Mode Toggle */}
          <ThemeToggle />

          <NoSSR>
            {/* Loading State */}
            {status === "loading" && <button className="btn btn-square bg-green-200 loading"></button>}

            {/* Not Authenticated - Show Login Options */}
            {status === "unauthenticated" && (
              <div className="flex space-x-3">
                <button className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-full hover:scale-110 transition-all hover:shadow-green-500" onClick={() => signIn("google")}>
                  <GoogleIcon className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-full hover:scale-110 transition-all hover:shadow-blue-500" onClick={() => signIn("github")}>
                  <GithubIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Authenticated - Profile Dropdown */}
            {status === "authenticated" && session?.user?.image && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all">
                  <div className="w-12 rounded-full border-2 border-transparent group-hover:border-green-500 transition-all">
                    <img src={session.user.image} alt="User Profile" className="rounded-full transition-all hover:ring-2 hover:ring-green-500" />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-3 shadow-xl bg-white dark:bg-gray-900 rounded-lg w-56">
                  <li className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
                    <FaUserCircle className="text-gray-700 dark:text-gray-300 text-lg mr-2" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{session.user.name}</span>
                  </li>
                  <li onClick={() => signOut()} className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-all">
                    <FaSignOutAlt className="text-red-500 mr-2" />
                    <span className="text-gray-800 dark:text-gray-200">Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </NoSSR>
        </div>

      </div>
    </nav>
  );
}

export default NavTop;