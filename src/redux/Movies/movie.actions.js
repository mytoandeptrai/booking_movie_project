import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { domain, USER_LOGIN } from "../../Config/settings";
import movieTypes from "./movie.types";

export const layDanhSachPhimApiAction = () => {
  //Thay vì return về object => middleware thunk cho phép mình return về 1 function có tham số là hàm dispatch
  return (dispatch) => {
    dispatch({
      type: movieTypes.FETCH_MOVIES_START,
    });
    axios({
      url: `${domain}/api/QuanLyPhim/LayDanhSachPhim`,
      method: "GET",
    })
      .then((res) => {
        // console.log("kết quả", res.data);
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: movieTypes.FETCH_MOVIES_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({
          type: movieTypes.FETCH_MOVIES_ERROR,
          payload: err.message,
        });
      });
  };
};

export const layChiTietPhimAction = (maPhim) => {
  return (dispatch) => {
    dispatch({
      type: movieTypes.FETCH_MOVIE_DETAILS_REQUEST,
    });
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        const action = {
          type: movieTypes.FETCH_MOVIE_DETAILS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({
          type: movieTypes.FETCH_MOVIES_ERROR,
          payload: err.message,
        });
      });
  };
};

export const layChiTietPhongVeAction = (maLichChieu) => {
  return (dispatch) => {
    dispatch({
      type: movieTypes.FETCH_MOVIE_TICKET_REQUEST,
    });
    axios({
      url: `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?maLichChieu=${maLichChieu}`,
      method: "GET",
    })
      .then((res) => {
        const action = {
          type: movieTypes.FETCH_MOVIE_TICKET_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({
          type: movieTypes.FETCH_MOVIE_TICKET_ERROR,
          payload: err.message,
        });
      });
  };
};

export const timKiemPhimAction = (keyWord, setDone) => {
  return (dispatch) => {
    try {
      if (keyWord == null || keyWord.trim() === "") {
        axios({
          url: `${domain}/api/QuanLyPhim/LayDanhSachPhim`,
          method: "GET",
        })
          .then((res) => {
            let { data } = res;
            dispatch({
              type: movieTypes.FETCH_MOVIES_SUCCESS,
              payload: data,
            });
            setDone(undefined);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        dispatch({
          type: movieTypes.SEARCH_MOVIE_SUCCESS,
          payload: keyWord,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const themPhimAction = (thongTinPhim, setDone) => {
  return async () => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      const ngayKhoiChieu = moment(thongTinPhim.ngayKhoiChieu).format(
        "DD/MM/YYYY"
      );
      const configThongTinPhim = {
        maPhim: parseInt(thongTinPhim.maPhim),
        tenPhim: thongTinPhim.tenPhim,
        biDanh: thongTinPhim.biDanh,
        trailer: thongTinPhim.trailer,
        hinhAnh: thongTinPhim.hinhAnh.name,
        moTa: thongTinPhim.moTa,
        maNhom: thongTinPhim.maNhom,
        ngayKhoiChieu: ngayKhoiChieu,
        danhGia: parseInt(thongTinPhim.danhGia),
      };
      console.log(configThongTinPhim);
      let { data, status } = await axios({
        url: `${domain}/api/QuanLyPhim/ThemPhim`,
        method: "POST",
        data: configThongTinPhim,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        const configFormData = {
          maPhim: parseInt(thongTinPhim.maPhim),
          tenPhim: thongTinPhim.tenPhim,
          biDanh: thongTinPhim.biDanh,
          trailer: thongTinPhim.trailer,
          hinhAnh: thongTinPhim.hinhAnh,
          moTa: thongTinPhim.moTa,
          maNhom: thongTinPhim.maNhom,
          ngayKhoiChieu: ngayKhoiChieu,
          danhGia: parseInt(thongTinPhim.danhGia),
        };
        var form_data = new FormData();

        for (var key in configFormData) {
          form_data.append(key, configFormData[key]);
        }
        axios({
          url: domain + "/api/QuanLyPhim/ThemPhimUploadHinh",
          method: "POST",
          data: form_data,
        })
          .then((res) => {
            swal("Thành công", "Thêm thành công", "success");
            console.log(res.data);
            setDone(undefined);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const suaPhimAction = (thongTinPhim, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      const ngayKhoiChieu = moment(thongTinPhim.ngayKhoiChieu).format(
        "DD/MM/YYYY"
      );
      const configThongTinPhim = {
        maPhim: parseInt(thongTinPhim.maPhim),
        tenPhim: thongTinPhim.tenPhim,
        biDanh: thongTinPhim.biDanh,
        trailer: thongTinPhim.trailer,
        hinhAnh: thongTinPhim.hinhAnh.name,
        moTa: thongTinPhim.moTa,
        maNhom: thongTinPhim.maNhom,
        ngayKhoiChieu: ngayKhoiChieu,
        danhGia: parseInt(thongTinPhim.danhGia),
      };
      let { data, status } = await axios({
        url: `${domain}/api/QuanLyPhim/CapNhatPhim`,
        method: "POST",
        data: configThongTinPhim,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        let { data, status } = res;
        const configFormData = {
          maPhim: parseInt(thongTinPhim.maPhim),
          tenPhim: thongTinPhim.tenPhim,
          biDanh: thongTinPhim.biDanh,
          trailer: thongTinPhim.trailer,
          hinhAnh: thongTinPhim.hinhAnh,
          moTa: thongTinPhim.moTa,
          maNhom: thongTinPhim.maNhom,
          ngayKhoiChieu: ngayKhoiChieu,
          danhGia: parseInt(thongTinPhim.danhGia),
        };
        var form_data = new FormData();

        for (var key in configFormData) {
          form_data.append(key, configFormData[key]);
        }
        axios({
          url: domain + "/api/QuanLyPhim/UploadHinhAnhPhim",
          method: "POST",
          data: form_data,
        })
          .then((res) => {
            swal("Thành công", "Thêm thành công", "success");
            console.log(res.data);
            setDone(undefined);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const xoaPhimAction = (MaPhim, setDone) => {
  return async (dispatch) => {
    try {
      const { accessToken } = JSON.parse(localStorage.getItem(USER_LOGIN));
      swal({
        title: "Bạn chắc chứ?",
        text: "Phim đã xóa thì không thể khôi phục lại!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            url: domain + `/api/QuanLyPhim/XoaPhim?MaPhim=${MaPhim}`,
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
              swal("Thất bại", "Không thể xóa phim này", "warning");
            });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
