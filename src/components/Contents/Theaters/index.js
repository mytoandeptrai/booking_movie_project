import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layHeThongRapAction,
  layThongTinCumRapAction,
  layThongTinLichChieuAction,
} from "../../../redux/Theaters/theater.actions";
import CinemaLogo from "./CinemaLogo/index";
import CinemaInfo from "./CinemaInfo/index";
import CinemaSchedule from "./CinemaSchedule";
import "./style.scss";
const TheaterSection = () => {
  const [maHeThongRap, setMaHeThongRap] = useState("BHDStar");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layHeThongRapAction());
  }, []);
  useEffect(() => {
    dispatch(layThongTinCumRapAction(maHeThongRap));
  }, [dispatch]);
  useEffect(() => {
    dispatch(layThongTinLichChieuAction(maHeThongRap));
  }, [dispatch]);

  const dsHeThongRap = useSelector(
    (state) => state.theatersData.danhSachHeThongRap
  );

  const dsCumRap = useSelector((state) => state.theatersData.danhSachCumRap);

  const dsLichChieu = useSelector(
    (state) => state.theatersData.danhSachLichChieu
  );
  // state lưu trữ logo cụm rạp
  const [logoImg, setLogoImg] = useState(
    "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
  );

  // state vị trí để so sánh maCumRap
  const [maCumRapIndex, setMaCumRapIndex] = useState(0);

  // state vị trí dùng để active khi select hệ thống rạp
  const [heThongRapActive, setHeThongRapActive] = useState(0);

  // state vị trí dùng để active khi select cụm rạp
  const [cumRapActive, setCumRapActive] = useState(0);

  return (
    <>
      <div className="cinema-container" id="rap">
        <h1>Rạp phim</h1>
        <div className="cinema-wrapper">
          {/* cinema logo */}
          <CinemaLogo
            dsHeThongRap={dsHeThongRap}
            setLogoImg={setLogoImg}
            setMaCumRapIndex={setMaCumRapIndex}
            heThongRapActive={heThongRapActive}
            setHeThongRapActive={setHeThongRapActive}
            setCumRapActive={setCumRapActive}
          />
          {/* cinema info */}
          <CinemaInfo
            dsCumRap={dsCumRap}
            logoImg={logoImg}
            setMaCumRapIndex={setMaCumRapIndex}
            cumRapActive={cumRapActive}
            setCumRapActive={setCumRapActive}
            dsLichChieu={dsLichChieu}
            maCumRapIndex={maCumRapIndex}
          />
          {/* schedule */}
          <CinemaSchedule
            dsLichChieu={dsLichChieu}
            dsCumRap={dsCumRap}
            maCumRapIndex={maCumRapIndex}
          />
        </div>
      </div>
    </>
  );
};

export default TheaterSection;
