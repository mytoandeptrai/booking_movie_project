import React, { useState } from "react";
import HomeContents from "../../components/Contents";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const HomePage = () => {
  // tạo useState để thiết lập trạng thái khi click vào icon ở Navbar
  const [isOpen, setIsOpen] = useState(false);

  //
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home-page">
      <Navbar toggle={toggle} />
      <HeroSection />
      <HomeContents />
      <Footer />
    </div>
  );
};

export default HomePage;
