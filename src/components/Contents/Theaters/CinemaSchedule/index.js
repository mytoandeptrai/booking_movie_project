import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const CinemaSchedule = ({ dsCumRap, dsLichChieu, maCumRapIndex }) => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const renderLichChieu = () => {
    const lichChieu = dsLichChieu?.find(
      (item) => item.maCumRap === dsCumRap[maCumRapIndex].maCumRap
    );

    // console.log(lichChieu);
    // lichChieu.danhSachPhim.map((el) => console.log(el));
    if (lichChieu) {
      return lichChieu.danhSachPhim.map((phim, index) => (
        <div key={index} className="cinema-showtime-wrapper">
          <div className="movie-img-container">
            <img src={phim.hinhAnh} alt="movie-img" />
          </div>
          <div className="cinema-showtime-content">
            <h5 style={{ fontSize: "14px", fontWeight: 600 }}>
              {phim.tenPhim}
            </h5>
            <div className="movie-schedule">
              {phim.lstLichChieuTheoPhim.map((ngayChieu) => (
                <NavLink
                  to={
                    currentUser.taiKhoan
                      ? `datve/${ngayChieu.maLichChieu}`
                      : `/signin`
                  }
                  className="showtime__link"
                  key={ngayChieu.maLichChieu}
                >
                  {moment(ngayChieu.ngayChieuGioChieu).format("hh:mm A")}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ));
    }
    return <h4 style={{ marginTop: 20 }}>Không có suất chiếu</h4>;
  };
  return (
    <>
      <div className="cinema-showtime">
        <div className="cinema-showtime-container">{renderLichChieu()}</div>
      </div>
    </>
  );
};

export default CinemaSchedule;
