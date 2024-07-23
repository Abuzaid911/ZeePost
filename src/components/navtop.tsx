import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { FaSun, FaMoon,  } from 'react-icons/fa';
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import NoSSR from "./NoSSR";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";


function NavTop() {
  const session = useSession();

  return (

    <nav>
      <div className="navbar bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

              <li> <Link href="/">Home Page</Link></li>
              <li> <Link href="/new">New post</Link></li>
              <li> <Link href="/about">About</Link></li>

            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl bg-gradient-to-r from-green-400 to-black text-transparent bg-clip-text ">ZeePost</a>
        </div>
        <div className="navbar-end">

          <NoSSR>

            {session.status == "loading" && <button className="btn btn-square bg-green-200 loading"></button>}
            {session.status == "unauthenticated" && (<>
              <button className="btn btn-ghost btn-circle " onClick={() => signIn("google")}><GoogleIcon /></button>
              <button className="btn btn-ghost btn-circle " onClick={() => signIn("github")}><GithubIcon /></button>
            </>)}
            {session.status == "authenticated" && session.data.user?.image && <div className="indicator">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={session.data.user?.image} />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li onClick={() => signOut()}><a>Logout</a></li>
                </ul>
              </div>
            </div>}
          </NoSSR>
        </div>
      </div>
    </nav>
  );
}

export default NavTop;