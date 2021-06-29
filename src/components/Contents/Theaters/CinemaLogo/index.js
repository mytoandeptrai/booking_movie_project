import React from "react";
import { useDispatch } from "react-redux";
import {
  updateCumRapAction,
  updateLichChieuAction,
} from "../../../../redux/Theaters/theater.actions";

const CinemaLogo = ({
  dsHeThongRap,
  setLogoImg,
  setMaCumRapIndex,
  setHeThongRapActive,
  heThongRapActive,
  setCumRapActive,
}) => {
  const dispatch = useDispatch();
  const handleClick = (heThongRap_ID) => {
    dispatch(updateCumRapAction(heThongRap_ID));
    dispatch(updateLichChieuAction(heThongRap_ID));
  };
  return (
    <>
      <div className="cinema-logo">
        <ul className="cinema-logo-list">
          {dsHeThongRap.map((heThongRap, index) => (
            <li
              key={heThongRap.maHeThongRap}
              className={
                heThongRapActive === index ? "active-link" : "cinema-logo-img"
              }
              onClick={() => {
                setLogoImg(heThongRap.logo);
                setMaCumRapIndex(0);
                setHeThongRapActive(index);
                setCumRapActive(0);
                handleClick(heThongRap.maHeThongRap);
              }}
            >
              <img src={heThongRap.logo} alt="cinema-logo" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CinemaLogo;
