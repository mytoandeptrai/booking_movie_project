import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./style.scss";
const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <footer id="lienhe" className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-links-container">
          <div className="footer-links-wrapper">
            <div className="footer-link-items">
              <h1>HỆ THỐNG RẠP</h1>
              <Link to="" className="footer-link">
                CyberMovies Quận 10
              </Link>
              <Link to="" className="footer-link">
                CyberMovies Gò Vấp
              </Link>
              <Link to="" className="footer-link">
                CyberMovies Quận 3
              </Link>
              <Link to="" className="footer-link">
                CyberMovies Tân Phú
              </Link>
            </div>
            <div className="footer-link-items">
              <h1>THÔNG TIN</h1>
              <Link to="" className="footer-link">
                Giới thiệu
              </Link>
              <Link to="" className="footer-link">
                Tin tức
              </Link>
              <Link to="" className="footer-link">
                Hỏi và đáp
              </Link>
              <Link to="" className="footer-link">
                Liên hệ
              </Link>
            </div>
          </div>
          <div className="footer-links-wrapper">
            <div className="footer-link-items">
              <h1>CHÍNH SÁCH VÀ QUY ĐỊNH</h1>
              <Link to="" className="footer-link">
                Điều khoản chung
              </Link>
              <Link to="" className="footer-link">
                Điều khoản giao dịch
              </Link>
              <Link to="" className="footer-link">
                Chính sách thanh toán
              </Link>
              <Link to="" className="footer-link">
                Chính sách bảo mật
              </Link>
            </div>
            <div className="footer-link-items">
              <h1>CHĂM SÓC KHÁCH HÀNG</h1>
              <span>Hotline: 1900 0091</span>
              <span>Giờ làm việc: 8:00 - 22:00</span>
              <span>Email hỗ trợ: hoidap@cybermovies.vn</span>
            </div>
          </div>
        </div>
        <section className="social-media">
          <div className="social-media-wrapper">
            <Link className="social-logo" to="/" onClick={toggleHome}>
              CyberMovies
            </Link>
            <small className="website-rights">
              MyToandeptrai @ {new Date().getFullYear()} All rights reserved.{" "}
              <br />{" "}
              <i>
                <a
                  target="__blank"
                  href="https://www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A"
                  style={{
                    color: "#1890ff",
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                >
                  {" "}
                  Inspired by Brian Design
                </a>
              </i>
            </small>

            <div className="social-icons">
              <Link to="/" onClick={toggleHome}>
                <FaFacebook></FaFacebook>
              </Link>
              <Link to="/" onClick={toggleHome}>
                <FaInstagram></FaInstagram>
              </Link>
              <Link to="/" onClick={toggleHome}>
                <FaYoutube></FaYoutube>
              </Link>
              <Link to="/" onClick={toggleHome}>
                <FaTwitter></FaTwitter>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
