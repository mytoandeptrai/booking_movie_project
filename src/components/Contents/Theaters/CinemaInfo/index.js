import React, { useState } from "react";

const CinemaInfo = ({
  maCumRapIndex,
  dsLichChieu,
  dsCumRap,
  logoImg,
  setMaCumRapIndex,
  cumRapActive,
  setCumRapActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="cinema-info">
        {dsCumRap.map((cumRap, index) => (
          <div
            key={cumRap.maCumRap}
            className={
              cumRapActive === index
                ? "cinema-info-active"
                : "cinema-info-container"
            }
            onClick={() => {
              setMaCumRapIndex(index);
              setCumRapActive(index);
              setIsOpen(true);
            }}
          >
            <div className="cinema-info-wrapper">
              <img src={logoImg} alt="logo img" />
              <div className="cinema-info-content">
                <p className={cumRapActive === index ? "text-bold" : ""}>
                  <span>{cumRap.tenCumRap} </span>
                </p>
                <p>{cumRap.diaChi}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CinemaInfo;
