import React, { useState, useEffect, useRef } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const navDrawerRef = useRef(null);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navDrawerRef.current &&
        !navDrawerRef.current.contains(event.target)
      ) {
        setNavDrawerOpen(false);
      }
    };

    if (navDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDrawerOpen]);

  return (
    <>
      <nav className="container mx-auto flex justify-between px-6 py-4">
        {/* left - logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo-light.png"
              alt="Shoppy Logo"
              className="w-24 md:w-28 lg:w-32 object-contain"
            />
          </Link>
        </div>

        {/* center - Navigation Links */}
        <div className="hidden space-x-6 md:flex items-center">
          <Link
            to="/collections/all?gender=Men"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Youtube
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            facbook
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Qr code
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            url shortener
          </Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUsers className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleNavDrawer}
            className="cursor-pointer md:hidden"
          >
            <HiBars3BottomRight />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        ref={navDrawerRef}
        className={`sm:w1/2 fixed top-0 left-0 z-50 h-full w-3/4 transform bg-white shadow-lg transition-transform duration-300 md:w-1/3 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 cursor-pointer text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              className="mb-2 block text-sm font-medium text-gray-700 uppercase hover:text-black"
            >
              youtube
            </Link>
            <Link
              to="/collections/all?gender=Women"
              className="mb-2 block text-sm font-medium text-gray-700 uppercase hover:text-black"
            >
              facebook
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              className="mb-2 block text-sm font-medium text-gray-700 uppercase hover:text-black"
            >
              qr code
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              className="mb-2 block text-sm font-medium text-gray-700 uppercase hover:text-black"
            >
              url shortener
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
