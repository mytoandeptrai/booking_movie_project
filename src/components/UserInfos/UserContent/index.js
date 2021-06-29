import { makeStyles } from "@material-ui/core/styles";
import { Button, Form, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { USER_LOGIN } from "../../../Config/settings";
import {
  layThongTinNguoiDungAction,
  nguoiDungChinhSuaThongTinAction,
} from "../../../redux/User/user.actions";
import "./style.css";
import "antd/dist/antd.css";
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const UserContent = ({ active }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const infoUser = useSelector((state) => state.usersData.infomationUser);
  const isLoading = useSelector((state) => state.usersData.isLoading);
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const [password, setpassword] = useState("");
  const [passwordChange1, setpasswordChange1] = useState("");
  const [passwordChange2, setpasswordChange2] = useState("");
  const [userChange, setUserChange] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem(USER_LOGIN)) {
      let taiKhoan = JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan;
      dispatch(layThongTinNguoiDungAction(taiKhoan));
    }
  }, []);

  useEffect(() => {
    if (infoUser?.email) {
      setUserChange({
        taiKhoan: infoUser.taiKhoan,
        matKhau: "",
        hoTen: infoUser.hoTen,
        soDT: infoUser.soDT,
        maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
        maNhom: infoUser.maNhom,
        email: infoUser.email,
      });
    }
  }, [infoUser]);
  const [hideModal, setHideModal] = useState(true);
  const toggleModal = () => setHideModal(!hideModal);
  const configModal = {
    hideModal,
    toggleModal,
  };
  // pagination
  const [currenPage, setCurrenPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currenPage * postsPerPage;
  const indexOfFistPost = indexOfLastPost - postsPerPage;
  const currentPost = infoUser?.thongTinDatVe.slice(
    indexOfFistPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrenPage(pageNumber);
  const nextPage = () => setCurrenPage(currenPage + 1);
  const prevPage = () =>
    setCurrenPage(currenPage > 1 ? currenPage - 1 : currenPage);
  // hide and show tr
  const handleChange = (e) => {
    let { value, name } = e.target;

    if (name === "matKhau") {
      setpassword(value);
    }
    if (name === "matKhauMoi1") {
      setpasswordChange1(value);
    }
    if (name === "matKhauMoi2") {
      setpasswordChange2(value);
    }
    setUserChange({
      ...userChange,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    dispatch(
      nguoiDungChinhSuaThongTinAction(userChange, history, infoUser.matKhau)
    );
  };
  const handleChangePassword = (matKhau) => {
    dispatch(nguoiDungChinhSuaThongTinAction(userChange, history, matKhau));
  };
  const handlePassword = () => {
    if (password === infoUser.matKhau) {
      if (passwordChange1 === null || passwordChange1 === "") {
        swal("Thất bại", "Mật khẩu không được để trống", "warning");
      } else if (passwordChange2 === null || passwordChange2 === "") {
        swal("Thất bại", "Mật khẩu không được để trống", "warning");
      } else if (passwordChange1 === passwordChange2) {
        handleChangePassword(passwordChange2);
      } else {
        swal("Thất bại", "Mật khẩu không đúng", "warning");
      }
    } else {
      swal("Thất bại", "Mật khẩu cũ không đúng", "warning");
    }
  };
  const renderUserInfo = () => {
    if (isLoading === false) {
      return (
        <>
          <div
            className="tab-pane fade show active info"
            id="thongtintaikhoan_tab"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              size={"large"}
              onFinish={handleSubmit}
            >
              <Form.Item label="Tên tài khoản">
                <Input
                  name="taiKhoan"
                  value={userChange.taiKhoan}
                  onChange={handleChange}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Họ và tên">
                <Input
                  name="hoTen"
                  value={userChange.hoTen}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  type="text"
                  name="soDT"
                  value={userChange.soDT}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  name="email"
                  value={userChange.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <div className="col-12 btn-thongtintaikhoan">
                <Button htmlType="submit" type="primary" size={"large"}>
                  Xác nhận
                </Button>
              </div>
            </Form>
          </div>
        </>
      );
    }
    return (
      <div className="account-loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  };

  const renderBookingHistory = () => {
    if (isLoading === false) {
      return (
        <>
          <div className="tiket__booking__history">
            <div className="tiket__booking__history__content">
              <div className="tiket__booking__history__content__table">
                <table
                  id="booking-history-table"
                  className="table table-striped table-dark  table-hover text-center"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>Mã Vé</th>
                      <th>Ngày Đặt</th>
                      <th>Tên Phim</th>
                      <th>Giá Vé</th>
                      <th>Thời Lượng Phim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPost.map((item, index) => (
                      <>
                        <tr
                          className="parent"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleModal()}
                        >
                          <td>{item.maVe}</td>
                          <td>{moment(item.ngayDat).format("YYYY-MM-DD")}</td>
                          <td>{item.tenPhim}</td>
                          <td>{item.giaVe}</td>
                          <td>{item.thoiLuongPhim}</td>
                        </tr>

                        <tr className="child" id={`${item.maVe}`}>
                          <td colSpan="5"></td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="account-loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  };
  const renderChangePassword = () => {
    return (
      <>
        <div
          className="tab-pane fade show info"
          id="doimatkhau_tab"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            size={"large"}
            onFinish={handlePassword}
          >
            <Form.Item label="Mật khẩu cũ">
              <Input
                type="password"
                name="matKhau"
                value={password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              <Input
                type="password"
                name="matKhauMoi1"
                value={passwordChange1}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Nhập lại mật khẩu mới">
              <Input
                type="password"
                name="matKhauMoi2"
                value={passwordChange2}
                onChange={handleChange}
              />
            </Form.Item>
            <div className="col-12 btn-thongtintaikhoan">
              <Button htmlType="submit" type="primary" size={"large"}>
                Đổi mật khẩu
              </Button>
            </div>
          </Form>
        </div>
      </>
    );
  };
  const renderContent = () => {
    if (active === "account_info") {
      return (
        <>
          <h3>Thông tin tài khoản</h3>
          {renderUserInfo()}
        </>
      );
    } else if (active === "booking_history") {
      return (
        <>
          <h3>Lịch sử đặt vé</h3>
          {renderBookingHistory()}
        </>
      );
    } else if (active === "change_password") {
      return (
        <>
          <h3>Thay đổi mật khẩu</h3>
          {renderChangePassword()}
        </>
      );
    }
  };
  return (
    <>
      <div className="accountContent-container">
        {/* {active === "account_info" ? (
          <h3>Thông tin tài khoản</h3>
        ) : (
          <h3>Lịch sử đặt vé</h3>
        )}
        {active === "account_info" ? renderUserInfo() : renderBookingHistory()} */}
        {renderContent()}
      </div>
    </>
  );
};

export default UserContent;
