import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const LeftCheckOut = () => {
  const chiTietPhim = useSelector((state) => state.moviesData.chiTietPhim);
  const hinhAnh = chiTietPhim.hinhAnh;

  return (
    <>
      <div
        className="LeftCheckout"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: "url(" + hinhAnh + ")",
        }}
      >
        <div className="LeftCheckout__modalleft"></div>
      </div>
    </>
  );
};

export default LeftCheckOut;
