import theaterTypes from "./theater.types";

const INITIAL_STATE = {
  danhSachHeThongRap: [],
  danhSachCumRap: [],
  danhSachLichChieu: [],
  isLoading: true,
  error: null,
};
const theaterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case theaterTypes.FETCH_HE_THONG_RAP_START:
      return {
        ...state,
      };
    case theaterTypes.FETCH_HE_THONG_RAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        danhSachHeThongRap: action.payload,
      };
    case theaterTypes.FETCH_HE_THONG_RAP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case theaterTypes.FETCH_THONG_TIN_CUM_RAP_SUCCESS:
      return {
        ...state,
        danhSachCumRap: action.payload,
      };
    case theaterTypes.FETCH_THONG_TIN_LICH_CHIEU_SUCCESS:
      return {
        ...state,
        danhSachLichChieu: action.payload[0].lstCumRap,
      };
    case theaterTypes.UPDATE_LICH_CHIEU_THEO_HE_THONG_RAP_SUCCESS:
      return {
        ...state,
        danhSachLichChieu: action.payload[0].lstCumRap,
      };
    case theaterTypes.UPDATE_CUM_RAP_THEO_HE_THONG_RAP_SUCCESS:
      return {
        ...state,
        danhSachCumRap: action.payload,
      };
    default:
      return state;
  }
};
export default theaterReducer;
