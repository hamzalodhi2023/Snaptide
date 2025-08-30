import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

function Topbar() {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="hidden items-center space-x-4 md:flex">
          <a
            href="https://github.com/hamzalodhi2023/Snaptide"
            target="_blank"
            className="hover:text-gray-300"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/hafsalodhi2023/snaptide-apis"
            target="_blank"
            className="hover:text-gray-300"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
        <div className="flex-grow text-center text-sm">
          <span>Snap instantly. Ride the tide of downloads.</span>
        </div>
        <div className="hidden text-sm md:block">
          <a
            href="tel:+92 300 0000000
"
            className="hover:text-gray-300"
          >
            +92 300 0000000
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
