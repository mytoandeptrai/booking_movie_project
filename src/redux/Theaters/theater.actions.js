import axios from "axios";
import { domain, groupID2 } from "../../Config/settings";
import theaterTypes from "./theater.types";

export const layHeThongRapAction = () => {
  return (dispatch) => {
    dispatch({
      type: theaterTypes.FETCH_HE_THONG_RAP_START,
    });
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinHeThongRap`,
      method: "GET",
    })
      .then((res) => {
        // console.log("kết quả", res.data);
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: theaterTypes.FETCH_HE_THONG_RAP_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({
          type: theaterTypes.FETCH_HE_THONG_RAP_ERROR,
          payload: err.message,
        });
      });
  };
};

export const layThongTinCumRapAction = (maHeThongRap) => {
  return (dispatch) => {
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET",
    })
      .then((res) => {
        // console.log("kết quả", res.data);
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: theaterTypes.FETCH_THONG_TIN_CUM_RAP_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        //   dispatch({
        //     type: theaterTypes.FETCH_HE_THONG_RAP_ERROR,
        //     payload: err.message,
        //   });
        console.log(err.message);
      });
  };
};

export const layThongTinLichChieuAction = (maHeThongRap) => {
  return (dispatch) => {
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${groupID2}`,
      method: "GET",
    })
      .then((res) => {
        // console.log("kết quả", res.data);
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: theaterTypes.FETCH_THONG_TIN_LICH_CHIEU_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        //   dispatch({
        //     type: theaterTypes.FETCH_HE_THONG_RAP_ERROR,
        //     payload: err.message,
        //   });
        console.log(err.message);
      });
  };
};

// update cụm rạp theo hệ thống rạp
export const updateCumRapAction = (heThongRap_ID) => {
  return (dispatch) => {
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${heThongRap_ID}`,
      method: "GET",
    })
      .then((res) => {
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: theaterTypes.UPDATE_CUM_RAP_THEO_HE_THONG_RAP_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
// update lịch chiếu theo cụm rap

export const updateLichChieuAction = (heThongRap_ID) => {
  return (dispatch) => {
    axios({
      url: `${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${heThongRap_ID}&maNhom=${groupID2}`,
      method: "GET",
    })
      .then((res) => {
        //dispatch lần 1 tại component để gọi action này thực thi
        //dispatch lần 2 sau khi có kết quả từ api lấy dữ liệu dispatch lên reducer
        const action = {
          type: theaterTypes.UPDATE_LICH_CHIEU_THEO_HE_THONG_RAP_SUCCESS,
          payload: res.data,
        };
        dispatch(action);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
