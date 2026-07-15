"use client"

import React, { useEffect } from "react";
import Home from "./home/page";

const Main = () => {

  useEffect(() => {
    const navbarHeight = 60;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (!element) return;
      const top = element.offsetTop - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    // Delay to ensure layout is ready
    const timer = setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default Main;