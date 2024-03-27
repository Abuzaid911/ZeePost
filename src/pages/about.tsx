import React from 'react';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import NavTop from "../components/navtop";
import Nav from "../components/nav";
import {NextPage} from "next";
import Link from "next/link";
import { IconType } from 'react-icons';

interface SocialLinkProps {
    Icon: IconType; // Use IconType for the Icon prop
    text: string;
    url: string;
}
const About:NextPage = () => {
    const description = "My name is Abuzaid and I am the brain behind this operation xD. I am a one-man team with a love for all things and a passion for creating awesome designs (and a lot more fun). Thank you for being here. I hope you enjoy using this app as much as I enjoyed creating it."; // Replace with your actual description

    return (
        <>
            <NavTop />
            <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-4 gap-8 ">
                <div className="flex flex-col items-center">
                    <div className="space-y-2 mb-4">
                        <SocialLink Icon={FaLinkedinIn} text="LinkedIn" url="https://www.linkedin.com/in/ahmed-abuzaid-a65732185/" />
                        <SocialLink Icon={FaGithub} text="GitHub" url="https://github.com/Abuzaid911" />
                        <SocialLink Icon={FaInstagram} text="Instagram" url="https://www.instagram.com/ahmedabuzaids/" />
                        <SocialLink Icon={FaTwitter} text="Twitter" url="https://twitter.com/ahmedwallahi?s=21&t=pz7e97LWT3QpMitZRWSbTg" />
                    </div>
                    {/*<div className="shadow-lg">*/}
                    {/*    <QRCode value="https://abuzaid.vercel.app/" size={96} />*/}
                    {/*</div>*/}
                </div>
                <div className="max-w-md text-center md:text-left">
                    <div className="rounded-full overflow-hidden w-48 h-48 mb-4 mx-auto md:mx-0">
                        <img src="https://avatars.githubusercontent.com/u/107811441?v=4" alt="Profile" className="object-cover w-full h-full" />
                    </div>
                    {/*<h2 className="text-3xl font-semibold mb-2 ml-6 font-mono">@ABUZAID</h2>*/}
                    <p className="font-mono bg-gradient-to-r from-green-400 to-black text-transparent bg-clip-text">{description}</p>
                </div>
            </div>
            <Nav active="about" />
        </>
    );
};

const SocialLink= React.memo(({ Icon, text, url }: SocialLinkProps) => {
    return (
        <a href={url} className="flex items-center justify-center bg-teal-300 rounded-full py-2 px-4 hover:bg-teal-400 transition-colors w-40"
           target="_blank" rel="noopener noreferrer">
            <Icon className="text-white text-xl" />
            <span className="ml-2 text-white font-semibold">{text}</span>
        </a>
    );
});

export default About;
