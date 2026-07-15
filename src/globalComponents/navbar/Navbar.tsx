"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import GlobalButton from "../buttons/GlobalButton";

import AppLogo from "@/assets/svgs/Dentistry99.svg";

const navMenus = [
  { label: "How it works", id: "how-it-works" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" }
];

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 60;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="xl:px-24 lg:px-16 md:px-6 px-4 border-b bg-white lg:py-4 py-3 sticky top-0 z-50 flex justify-center">
      <div className="flex justify-between w-full items-center">

        <div className="flex items-center xl:gap-10 gap-6">
          <Image onClick={() => router.push("/")} src={AppLogo} priority alt="Logo" className="cursor-pointer" />

          <ul className="hidden lg:flex gap-6">
            {navMenus.map((menu, i) => (
              <li
                key={i}
                className="text-black hover:text-[#33C92D] text-sm cursor-pointer transition-colors duration-200"
                onClick={() => scrollToSection(menu.id)}
              >
                {menu.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex gap-4">
          <GlobalButton onClick={() => router.push("/login")} title="Sign in" width="87px" bgColor="#2D2D2D" font="400" />
          <GlobalButton onClick={() => router.push("/demo")} title="Register" width="125px" font="400" />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded text-black hover:bg-[#D7FFD5] cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b">
            <Image src={AppLogo} priority alt="Logo" className="w-28" />
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-6 p-4">
            {navMenus.map((menu, i) => (
              <li
                key={i}
                className="text-black text-sm cursor-pointer hover:text-[#33C92D] transition-colors duration-200"
                onClick={() => scrollToSection(menu.id)}
              >
                {menu.label}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 px-4 mt-4">
            <GlobalButton onClick={() => router.push("/login")} title="Sign in" width="100%" bgColor="#2D2D2D" font="400" />
            <GlobalButton onClick={() => router.push("/demo")} title="Register" width="100%" font="400" />
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;