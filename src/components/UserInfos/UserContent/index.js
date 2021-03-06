import { makeStyles } from "@material-ui/core/styles";
import { Button, Form, Input } from "antd";
import "antd/dist/antd.css";
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
import BookingSteatHistoryItem from "./BookingSeatHistoryItem";
import Pagination from "./../../Pagination";
import "./style.css";
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
        swal("Th???t b???i", "M???t kh???u kh??ng ???????c ????? tr???ng", "warning");
      } else if (passwordChange2 === null || passwordChange2 === "") {
        swal("Th???t b???i", "M???t kh???u kh??ng ???????c ????? tr???ng", "warning");
      } else if (passwordChange1 === passwordChange2) {
        handleChangePassword(passwordChange2);
      } else {
        swal("Th???t b???i", "M???t kh???u kh??ng ????ng", "warning");
      }
    } else {
      swal("Th???t b???i", "M???t kh???u c?? kh??ng ????ng", "warning");
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
              <Form.Item label="T??n t??i kho???n">
                <Input
                  name="taiKhoan"
                  value={userChange.taiKhoan}
                  onChange={handleChange}
                  disabled
                />
              </Form.Item>
              <Form.Item label="H??? v?? t??n">
                <Input
                  name="hoTen"
                  value={userChange.hoTen}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="S??? ??i???n tho???i">
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
                  X??c nh???n
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
                      <th>M?? V??</th>
                      <th>Ng??y ?????t</th>
                      <th>T??n Phim</th>
                      <th>Gi?? V??</th>
                      <th>Th???i L?????ng Phim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPost.map((item, index) => (
                      <>
                        <tr className="parent" style={{ cursor: "pointer" }}>
                          <td>{item.maVe}</td>
                          <td>{moment(item.ngayDat).format("YYYY-MM-DD")}</td>
                          <td>{item.tenPhim}</td>
                          <td>{item.giaVe}</td>
                          <td>{item.thoiLuongPhim}</td>
                        </tr>

                        <tr className="child" id={`${item.maVe}`}>
                          <td colSpan="5">
                            {/* <BookingSteatHistoryItem
                              booking={item.danhSachGhe}
                            /> */}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <Pagination
                postsPerPage={postsPerPage}
                totalPost={post.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              /> */}
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
            <Form.Item label="M???t kh???u c??">
              <Input
                type="password"
                name="matKhau"
                value={password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="M???t kh???u m???i">
              <Input
                type="password"
                name="matKhauMoi1"
                value={passwordChange1}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Nh???p l???i m???t kh???u m???i">
              <Input
                type="password"
                name="matKhauMoi2"
                value={passwordChange2}
                onChange={handleChange}
              />
            </Form.Item>
            <div className="col-12 btn-thongtintaikhoan">
              <Button htmlType="submit" type="primary" size={"large"}>
                ?????i m???t kh???u
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
          <h3>Th??ng tin t??i kho???n</h3>
          {renderUserInfo()}
        </>
      );
    } else if (active === "booking_history") {
      return (
        <>
          <h3>L???ch s??? ?????t v??</h3>
          {renderBookingHistory()}
        </>
      );
    } else if (active === "change_password") {
      return (
        <>
          <h3>Thay ?????i m???t kh???u</h3>
          {renderChangePassword()}
        </>
      );
    }
  };
  return (
    <>
      <div className="accountContent-container">
        {/* {active === "account_info" ? (
          <h3>Th??ng tin t??i kho???n</h3>
        ) : (
          <h3>L???ch s??? ?????t v??</h3>
        )}
        {active === "account_info" ? renderUserInfo() : renderBookingHistory()} */}
        {renderContent()}
      </div>
    </>
  );
};

export default UserContent;
