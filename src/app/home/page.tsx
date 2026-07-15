import React from "react";

import Faqs from "@/globalComponents/sections/Faqs";
import Navbar from "@/globalComponents/navbar/Navbar";
import Footer from "@/globalComponents/footer/Footer";
import PricingTabs from "@/globalComponents/sections/PricingTabs";
import OurServices from "@/globalComponents/sections/OurServices";
import VideoSection from "@/globalComponents/sections/VideoSection";
import HeroSection from "@/globalComponents/heroSection/HeroSection";
import AboutDentistry99 from "@/globalComponents/sections/AboutDentistry99";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <VideoSection/>
      <AboutDentistry99/>
      <OurServices/>
      <PricingTabs />
      <Faqs/>
      <Footer/>
    </div>
  );
};

export default Home;