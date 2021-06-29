import React from "react";
import img1 from "./images/svg-1.svg";
import img2 from "./images/svg-2.svg";
import img3 from "./images/svg-3.svg";
import "./style.scss";
const Services = () => {
  return (
    <>
      <div className="servicesContainer" id="khuyenmai">
        <h1>Khuyến mãi</h1>
        <div className="servicesWrapper">
          <div className="servicesCard">
            <div className="servicesIcon">
              <img src={img1} alt="" />
              <h2>Giảm 30% combo bắp nước</h2>
              <p>Nhanh tay tải ngay App</p>
            </div>
          </div>

          <div className="servicesCard">
            <div className="servicesIcon">
              <img src={img2} alt="" />
              <h2>Giảm 30% combo bắp nước</h2>
              <p>Nhanh tay tải ngay App</p>
            </div>
          </div>

          <div className="servicesCard">
            <div className="servicesIcon">
              <img src={img3} alt="" />
              <h2>Giảm 30% combo bắp nước</h2>
              <p>Nhanh tay tải ngay App</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
