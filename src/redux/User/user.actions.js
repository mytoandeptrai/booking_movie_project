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

export const layDanhSachNguoiDungAction = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: userTypes.FETCH_USERS_START,
      });
      axios({
        url: `${domain}/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,
        method: "GET",
      }).then((res) => {
        const action = {
          type: userTypes.FETCH_USERS_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const timKiemNguoiDungAction = (keyWord, setDone) => {
  console.log(keyWord);
  return (dispatch) => {
    if (keyWord == null || keyWord.trim() === "") {
      axios({
        url: domain + "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
      })
        .then((res) => {
          let { data } = res;
          dispatch({
            type: userTypes.FETCH_USERS_SUCCESS,
            payload: data,
          });
          setDone(undefined);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios({
        url:
          domain +
          `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyWord}`,
        method: "GET",
      })
        .then((res) => {
          let { data } = res;
          dispatch({
            type: userTypes.SEARCH_USER_SUCCESS,
            payload: data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
};

export const themNguoiDungAction = (userAdding, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: `${domain}/api/QuanLyNguoiDung/ThemNguoiDung`,
        method: "POST",
        data: {
          taiKhoan: userAdding.taiKhoan,
          matKhau: userAdding.matKhau,
          email: userAdding.email,
          soDT: userAdding.soDT,
          maNhom: userAdding.maNhom,
          hoTen: userAdding.hoTen,
          maLoaiNguoiDung: userAdding.maLoaiNguoiDung,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        swal("Thành công", "Thêm thành công", "success");
        setDone(undefined);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const xoaNguoiDungAction = (taiKhoan, setDone) => {
  return (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Người dùng đã xóa không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url:
              domain + `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => {
              let { data, status } = res;
              if (status === 200) {
                swal("Thành công", "Xóa thành công", "success");
                setDone(undefined);
              }
            })
            .catch((err) => {
              swal("Thất bại", "Không thể xóa người dùng này", "warning");
            });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const suaNguoiDungAction = (userEdited, setDone) => {
  console.log(userEdited);
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      let { data, status } = await axios({
        url: domain + "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "put",
        data: {
          taiKhoan: userEdited.taiKhoan,
          matKhau: userEdited.matKhau,
          email: userEdited.email,
          soDT: userEdited.soDT,
          maLoaiNguoiDung: userEdited.maLoaiNguoiDung,
          maNhom: userEdited.maNhom,
          hoTen: userEdited.hoTen,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        swal(
          "Thành công",
          "Bạn đã sửa thành công vui lòng đăng nhập lại",
          "success"
        );
        setDone(undefined);
      }
    } catch (err) {
      swal(
        "Thất bại",
        "Không thể sửa vui lòng thử lại khi đăng xuất",
        "warning"
      );
    }
  };
};
