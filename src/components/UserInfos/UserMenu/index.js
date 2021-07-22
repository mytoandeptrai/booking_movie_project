import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";
import { dangXuatTaiKhoanAction } from "../../../redux/User/user.actions";
const UserMenu = ({ active, setActive }) => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <div className="accountMenu-container">
        <div className="accountMenu-wrapper">
          <div className="accountAva-container">
            <div className="accountAva-info">
              {currentUser.taiKhoan?.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <ul>
            <li>
              <h4
                className={`accountMenu-link1 menu ${
                  active === "account_info" ? "acc-active-link" : ""
                }`}
                onClick={() => {
                  setActive("account_info");
                }}
              >
                Thông tin tài khoản
              </h4>
            </li>
            <li>
              <h4
                className={`accountMenu-link2 menu ${
                  active === "booking_history" ? "acc-active-link" : ""
                }`}
                onClick={() => {
                  setActive("booking_history");
                }}
              >
                Lịch sử đặt vé
              </h4>
            </li>
            <li>
              <h4
                className={`accountMenu-link2 menu ${
                  active === "change_password" ? "acc-active-link" : ""
                }`}
                onClick={() => {
                  setActive("change_password");
                }}
              >
                Đổi mật khẩu
              </h4>
            </li>
            {currentUser.maLoaiNguoiDung === "QuanTri" ? (
              <>
                {" "}
                <li>
                  <NavLink className="menu" to="/admin/NguoiDungManager">
                    Quản lý người dùng
                  </NavLink>
                </li>{" "}
              </>
            ) : (
              <> </>
            )}
            <li>
              <NavLink className="menu" to="/">
                Quay lại trang chủ
              </NavLink>
            </li>
            <li>
              <h4
                className="accountMenu-link2 menu"
                onClick={() => {
                  dispatch(dangXuatTaiKhoanAction(history));
                }}
              >
                Đăng xuất
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
