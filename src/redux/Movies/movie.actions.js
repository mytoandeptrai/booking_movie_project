import axios from "axios";
import { domain } from "../../Config/settings";
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
