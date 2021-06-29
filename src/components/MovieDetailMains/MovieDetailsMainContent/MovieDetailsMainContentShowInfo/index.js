import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { NavLink } from "react-router-dom";
const MovieDetailMainContentShowInfo = ({ movieDetail }) => {
  const [toggleState, setToggleState] = useState(0);
  
  let userLogined = useSelector((state) => state.usersData.currentUser);
  return (
    <>
      <div className="detail__showtime container" id="showTimeDetail">
        <div className="row container">
          <div
            className="col-md-4 col-sm-4 nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {movieDetail.heThongRapChieu?.map((heThongRap, index) => {
              return (
                <a
                  key={index}
                  style={{ display: "inline-block", width: "100%" }}
                  className={
                    toggleState === index ? "nav-link active" : "nav-link"
                  }
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href={`#${heThongRap.maHeThongRap}`}
                  onClick={() => setToggleState(index)}
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  <img src={heThongRap.logo} width={50} height={50} alt="" />{" "}
                  <span>{heThongRap.tenHeThongRap}</span>
                </a>
              );
            })}
          </div>
          <div
            className="col-md-8 col-sm-8 tab-content"
            id="v-pills-tabContent"
          >
            {movieDetail.heThongRapChieu?.map((heThongRap, index) => {
              return (
                <div
                  key={index}
                  className={
                    toggleState === index
                      ? "tab-pane fade show active"
                      : "tab-pane fade show"
                  }
                  id={`${heThongRap.maHeThongRap}`}
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  {heThongRap.cumRapChieu?.map((cumRap, index) => {
                    return (
                      <div key={index}>
                        <h3>{cumRap.tenCumRap}</h3>
                        <div className="row">
                          {cumRap.lichChieuPhim
                            ?.slice(0, 12)
                            .map((lichChieu, index) => {
                              /* slice: duyệt 0 -> 12 */
                              /* sử dụng thư viện moment để format lại thời gian theo ý thích */
                              return (
                                <NavLink
                                  to={
                                    userLogined.taiKhoan
                                      ? `/datve/${lichChieu.maLichChieu}`
                                      : `/signin`
                                  }
                                  style={{
                                    marginBottom: "10px",
                                    marginRight: "5px",
                                  }}
                                  className="showtime__link col-md-3 col-sm-4"
                                  key={index}
                                >
                                  {moment(lichChieu.ngayChieuGioChieu).format(
                                    "hh:mm A"
                                  )}
                                </NavLink>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailMainContentShowInfo;
