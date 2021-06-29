import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import CheckoutCountDown from "../../../components/ChekoutCountDown";
import ListSeatCheckOut from "./ListSeatCheckOut";
const SeatCheckOut = ({ danhSachGheDangDat, setDanhSachGheDangDat }) => {
  const dispatch = useDispatch();
  const thongTinPhongVe = useSelector(
    (state) => state.moviesData.thongTinPhongVe
  );
  const { danhSachGhe, thongTinPhim } = thongTinPhongVe;
  const { ngayChieu, tenCumRap, tenRap } = thongTinPhim;
  // class cho từng loại ghế
  const active =
    "list__seat__item list__seat__item__active list__seat__item__cursor";
  const notVip = "list__seat__item  list__seat__item__cursor";
  const selected =
    "list__seat__item list__seat__item__selected list__seat__item__cursor";
  const vip = "list__seat__item list__seat__item__vip list__seat__item__cursor";
  // Đặt ghế
  const datGhe = (ghe) => {
    // ghế đang đặt
    let indexGhe = danhSachGheDangDat.findIndex(
      (gheDangDat) => gheDangDat.stt === ghe.stt
    );
    // kiểm tra ghế được click có trong mảng thì remove ra, chưa có thì push vào
    if (indexGhe !== -1) {
      danhSachGheDangDat.splice(indexGhe, 1);
    } else {
      danhSachGheDangDat.push(ghe);
    }
    let danhSachGheUpdate = [...danhSachGheDangDat];
    setDanhSachGheDangDat(danhSachGheUpdate);
  };
  console.log(danhSachGhe);
  const renderSeat = () => {
    return danhSachGhe.map((ghe, index) => {
      let classLoaiGhe = ghe.loaiGhe === "Vip" ? vip : "";
      let classGheDaChon = ghe.daDat === true ? selected : "";
      console.log(ghe.daDat);
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.stt === ghe.stt
      );
      let classGheDangDat = indexGheDangDat !== -1 ? active : "";
      return (
        <ListSeatCheckOut
          key={index}
          tenGhe={ghe.tenGhe}
          datGhe={datGhe}
          ghe={ghe}
          classLoaiGhe={classLoaiGhe}
          classGheDaChon={classGheDaChon}
          classGheDangDat={classGheDangDat}
        />
      );
    });
  };
  return (
    <>
      <div className="SeatCheckout">
        <div className="SeatCheckout__topContent">
          <div className="SeatCheckout__topContent__leftTitle">
            <div className="logoCinema">
              <img
                className="logo"
                src="https://s3img.vcdn.vn/123phim/2018/09/f32670fd0eb083c9c4c804f0f3a252ed.png"
                alt="logo"
              />
            </div>
            <div className="contentCinema">
              <p className="address">{tenCumRap}</p>
              <p className="hour">
                {ngayChieu} - {tenRap}
              </p>
            </div>
          </div>
          <div className="SeatCheckout__topContent__rightTitle">
            <p className="info1">Thời gian giữ ghế</p>
            <p className="info2">
              <span className="SeatCheckout__topContent__rightTitle__setTime">
                <CheckoutCountDown time={300000} />
              </span>
            </p>
          </div>
        </div>
        <div className="SeatCheckout__seatMap">
          <div className="SeatCheckout__seatMap__room">
            <div className="screen">
              <div className="namescreen">
                <img
                  src="https://tix.vn/app/assets/img/icons/screen.png"
                  alt=""
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="listSeat mt-1 d-flex justify-align-content-between">
                <div className="d-inline-block listSeat__title">
                  <h4>A</h4>
                  <h4>B</h4>
                  <h4>C</h4>
                  <h4>D</h4>
                  <h4>E</h4>
                  <h4>F</h4>
                  <h4>G</h4>
                  <h4>H</h4>
                  <h4>I</h4>
                  <h4>J</h4>
                  <h4>K</h4>
                  <h4>L</h4>
                  <h4>M</h4>
                  <h4>N</h4>
                </div>
                <div className="listSeat__content">{renderSeat()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <div className="listSeat__description d-flex justify-content-around">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="list__seat">
                <div className="list__seat__item  list__seat__item__cursor">
                  <button className="list__seat__item__btn ">
                    <span className="list__seat__item__btn_title">0</span>
                  </button>
                </div>
              </div>
              <p>Ghế thường</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="list__seat">
                <div className="list__seat__item list__seat__item__vip list__seat__item__cursor">
                  <button
                    className="list__seat__item__btn list__seat__item__btn__vip"
                    style={{ backgroundColor: "#f7b500" }}
                  >
                    <span className="list__seat__item__btn_title">0</span>
                  </button>
                </div>
              </div>
              <p>Ghế vip</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="list__seat">
                <div className="list__seat__item list__seat__item__active list__seat__item__cursor">
                  <button
                    className="list__seat__item__btn "
                    style={{ backgroundColor: "yellowgreen" }}
                  >
                    <span className="list__seat__item__btn_title">
                      {danhSachGheDangDat.length}
                    </span>
                  </button>
                </div>
              </div>
              <p>Đang chọn</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="list__seat">
                <div className="list__seat__item list__seat__item__selected list__seat__item__cursor">
                  <button
                    className="list__seat__item__btn "
                    style={{ backgroundColor: "pink" }}
                  >
                    <span className="list__seat__item__btn_title">0</span>
                  </button>
                </div>
              </div>
              <p>Ghế đã có người chọn</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatCheckOut;
