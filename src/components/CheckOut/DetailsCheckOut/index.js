import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { nguoiDungDatVeAction } from "../../../redux/User/user.actions";
import "./style.scss";
const DetailsCheckOut = ({ danhSachGheDangDat, maLichChieu }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const thongTinPhongVe = useSelector(
    (state) => state.moviesData.thongTinPhongVe
  );
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const { danhSachGhe, thongTinPhim } = thongTinPhongVe;
  const { ngayChieu, tenCumRap, tenRap, gioChieu, tenPhim } = thongTinPhim;
  const styleButon = () => {
    if (danhSachGheDangDat.length < 1 || danhSachGheDangDat === undefined) {
      return "DetailCheckout__buyTicket";
    } else {
      return "DetailCheckout__buyTicketactive";
    }
  };
  const disableButton =
    styleButon() === "DetailCheckout__buyTicket" ? true : false;
  const danhSachGheDuocChon = danhSachGheDangDat.map((ghe) => ghe.tenGhe + ",");
  const tinhTongTien = () => {
    const formatter = new Intl.NumberFormat("en");
    const tt = danhSachGheDangDat.reduce((tongtien, ghe, index) => {
      return (tongtien += +ghe.giaVe);
    }, 0);
    return formatter.format(tt);
  };
  const handleBooking = () => {
    const danhSachVe = danhSachGheDangDat.map((ghe) => ({
      maGhe: ghe.maGhe,
      giaVe: ghe.giaVe,
    }));
    dispatch(nguoiDungDatVeAction(maLichChieu, danhSachVe, history));
  };
  return (
    <>
      <div className="DetailCheckout">
        <div className="DetailCheckout__all customScroll">
          <div className="DetailCheckout__all__totalCost ">
            <p>{tinhTongTien()} đ</p>
          </div>

          <div className="DetailCheckout__all__filmName">
            <span className="ageType">C18</span>
            <span className="tenPhim">{tenPhim}</span>
            <div className="infoCinema">
              <span className="cinemaName">{tenCumRap}</span>
              {/* <span className="streetName"></span> */}
            </div>
            <div className="hour ">
              {ngayChieu} - {gioChieu} - {tenRap}
            </div>
          </div>

          <div className="DetailCheckout__all__chair row">
            <div className="col-sm-7 isPlaced">
              <span className="isPlaced__title">
                Ghế : {danhSachGheDuocChon}
              </span>
              <span> </span>
              <span className="isPlaced__show"></span>
            </div>
            <div className="col-sm-5 chair__total">{tinhTongTien()} đ</div>
          </div>

          <div className="DetailCheckout__all__infouser">
            <div className="row">
              <input
                className="inputEmail"
                placeholder=" "
                type="text"
                id="emailCheckout"
                name="emailCheckout"
                value={currentUser?.email}
                required
              />
              <label className="labelEmail" htmlFor="emailCheckout">
                E-Mail
              </label>
            </div>
          </div>

          <div className="DetailCheckout__all__infouser">
            <div className="row">
              <input
                className="inputPhone"
                placeholder=" "
                type="text"
                id="phoneCheckout"
                name="phoneCheckout"
                value={currentUser?.hoTen}
                required
              />
              <label className="labelPhone" htmlFor="phoneCheckout">
                Họ Tên
              </label>
            </div>
          </div>

          <div className="DetailCheckout__all__voucher">
            <div className="row">
              <input
                type="text"
                placeholder="Nhập tại đây ..."
                name="voucherCheckout"
                id="voucherCheckout"
                className="voucherCheckout"
              />
              <label className="labelVoucher" htmlFor="voucherCheckout">
                Mã Giảm Giá
              </label>
              <div className="applyVoucher">
                <p> Áp dụng</p>
              </div>
            </div>
          </div>

          <div className="DetailCheckout__all__methodPay">
            <div className="methodPay__title">Hình thức thanh toán</div>
            <div className="methodPay__requiredBooking">
              Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp
            </div>
          </div>

          <div className="DetailCheckout__all__notice">
            <img
              src="https://tix.vn/app/assets/img/icons/exclamation.png"
              alt=""
            />
            <span className="notice__title">
              Vé đã mua không thể đổi hoặc hoàn tiền <br />
            </span>
            <span className="notice__title">
              Mã vé sẽ được gửi qua tin nhắn
              <span> SMS </span>
              (tin nhắn Zalo) và
              <span> Email </span>
              đã đăng nhập
            </span>
          </div>
        </div>
        <div className={styleButon()}>
          <button onClick={handleBooking} disabled={disableButton}>
            Đặt Vé
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsCheckOut;
