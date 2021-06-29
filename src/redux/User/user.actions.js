import axios from "axios";
import { accessToken, domain, USER_LOGIN } from "../../Config/settings";
import userTypes from "./user.types";
import swal from "sweetalert";
export const nguoiDungDangKyAction = (userRegister, history) => {
  return async (dispatch) => {
    dispatch({
      type: userTypes.USER_SIGNUP_REQUEST,
    });
    try {
      let { status } = await axios({
        url: `${domain}/api/QuanLyNguoiDung/DangKy`,
        method: "post",
        data: {
          taiKhoan: userRegister.taiKhoan,
          matKhau: userRegister.matKhau,
          email: userRegister.email,
          soDt: userRegister.soDt,
          maNhom: userRegister.maNhom,
          hoTen: userRegister.hoTen,
          maLoaiNguoiDung: userRegister.maLoaiNguoiDung,
        },
      });
      if (status === 200) {
        dispatch({
          type: userTypes.USER_SIGNUP_SUCCESS,
          payload: userRegister,
        });
        swal("Thành công", "bạn đăng ký thành công", "success");
        history.push("/signin");
      }
    } catch (err) {
      swal("Thất bại", "Đăng ký thất bại", "warning");
      dispatch({
        type: userTypes.USER_SIGNUP_FAILED,
        payload: err.message,
      });
    }
  };
};

export const nguoiDungDangNhapAction = (userLogin, history) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios({
        url: `${domain}/api/quanlynguoidung/dangnhap`,
        method: "post",
        data: {
          taiKhoan: userLogin.taiKhoan,
          matKhau: userLogin.matKhau,
        },
      });
      if (status === 200) {
        //Sau khi gọi api => dispatch lên redux
        dispatch({
          type: userTypes.USER_LOGIN_SUCCESS,
          payload: data,
        });
        //Lưu vào localstorage
        localStorage.setItem(USER_LOGIN, JSON.stringify(data));
        localStorage.setItem(accessToken, data.accessToken);
        swal("Thành công", "bạn đăng nhập thành công", "success");
        history.push("/");
      }
    } catch (err) {
      swal("Thất bại", "Tài khoản hoặc mật khẩu không đúng", "warning");
    }
  };
};

export const layThongTinNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      dispatch({
        type: userTypes.USER_INFO_REQUEST,
      });
      axios({
        method: "POST",
        url: `${domain}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        data: { taiKhoan: taiKhoan },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        console.log(data);
        if (status === 200) {
          const action = {
            type: userTypes.USER_INFO_SUCCESS,
            payload: data,
          };
          dispatch(action);
        }
      });
    } catch (error) {
      dispatch({
        type: userTypes.USER_INFO_ERROR,
        payload: error.message,
      });
    }
  };
};

export const dangXuatTaiKhoanAction = (history) => {
  return (dispatch) => {
    dispatch({
      type: userTypes.USER_LOGOUT,
    });
    swal("Thành công", "Bạn đăng xuất thành công", "success");
    history.push("/");
  };
};

// đăt vế
export const nguoiDungDatVeAction = (maLichChieu, danhSachVe, history) => {
  return async function (dispatch) {
    try {
      // get local
      const currentUser = JSON.parse(localStorage.getItem(USER_LOGIN));
      //call api
      const res = await axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: {
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung: currentUser.taiKhoan,
        },

        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
        swal({
          title: "Đặt vé thành công!",
          icon: "success",
        }).then(() => {
          history.push("/");
        });
      }
      //success;
    } catch (error) {
      swal({
        title: "Đặt vé thất bại!",
        icon: "warning",
      }).then(() => {
        history.push("/home");
      });
    }
  };
};

export const nguoiDungChinhSuaThongTinAction = (
  userChange,
  history,
  matKhau
) => {
  console.log({ userChange, matKhau });
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: `${domain}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data: {
          taiKhoan: userChange.taiKhoan,
          matKhau: matKhau,
          email: userChange.email,
          soDT: userChange.soDT,
          maLoaiNguoiDung: userChange.maLoaiNguoiDung,
          maNhom: userChange.maNhom,
          hoTen: userChange.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        console.log(data);
        // Sau khi gọi api => dispatch lên redux
        dispatch({
          type: userTypes.UPDATE_USER_INFO_SUCCESS,
          payload: data,
        });
        history.push("/");
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
      }
    } catch (error) {
      console.log(error.message);
      swal(
        "Thất bại",
        "Không thể sửa vui lòng thử lại khi đăng xuất",
        "warning"
      );
    }
  };
};
