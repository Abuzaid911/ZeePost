import React from "react";
import { FaInstagram, FaLinkedinIn, FaPinterest, FaDribbble, FaBehance, FaXTwitter, } from "react-icons/fa6";
import NavTop from "../components/navtop";
import Nav from "../components/nav";
import { NextPage } from "next";

// Social Media Links
const socialLinks = [
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com", color: "#0077b5" },
    { Icon: FaXTwitter, url: "https://twitter.com", color: "#000000" },
    { Icon: FaInstagram, url: "https://www.instagram.com", color: "#E4405F" },
];

// About Component
const About: NextPage = () => {
    return (
        <>
            <NavTop />
            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col md:flex-row items-center justify-center p-10 gap-12">

                {/* Left Side - Profile Info */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Hey!!</h1>
                    {/* <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mt-2">UI-UX Designers</h2> */}

                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-4">
                        I'm Abuzaid! 👋 I'm the mastermind behind this operation xD.
                        <br></br>
                        A passionate creator who loves all things tech & design.
                        <br></br>
                        I hope you enjoy using this app as much as I loved building it!
                    </p>

                    {/* Social Media Links */}
                    <div className="flex space-x-4 mt-6 justify-center md:justify-start">
                        {socialLinks.map(({ Icon, url, color }, index) => (
                            <a
                                key={index}
                                href={"url"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full shadow-md transition-all transform hover:scale-110"
                                style={{ backgroundColor: color }}
                            >
                                <Icon className="text-white text-xl" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side - Profile Illustration */}
                <div className="relative rounded-full overflow-hidden w-48 h-48 mb-6 mx-auto md:mx-0 shadow-lg border-4 border-teal-400">
                        <img 
                            src="https://avatars.githubusercontent.com/u/107811441?v=4" 
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>

            </div>
            <Nav active="about" />
        </>
    );
};

export default About;