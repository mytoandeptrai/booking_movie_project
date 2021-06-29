import React from "react";
import { useState } from "react";
import video from "./video.mp4";
import "./style.scss";
import { Link } from "react-router-dom";
import { MdArrowForward, MdKeyboardArrowRight } from "react-icons/md";
const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <>
      <div className="hero-container">
        <div className="hero-bg">
          <video autoPlay loop muted src={video} type="video/mp4"></video>
          {/* <VideoBg autoPlay loop muted src="/videos/video1.mp4" type='video/mp4'></VideoBg> */}
        </div>
        <div className="hero-content">
          <h1>Tẹt ga 45k</h1>
          <p>Đăng ký thành viên để được hưởng ưu đãi</p>
          <div className="hero-btn-wrapper">
            <Link
              className="signup-btn"
              to="/signup"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
            >
              Đăng ký{" "}
              {hover ? (
                <MdArrowForward className="arrow-icon"></MdArrowForward>
              ) : (
                <MdKeyboardArrowRight className="arrow-icon"></MdKeyboardArrowRight>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
