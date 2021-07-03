import movieTypes from "./movie.types";

const INITIAL_STATE = {
  danhSachPhim: [],
  chiTietPhim: {},
  thongTinPhongVe: [],
  phimTimKiem: null,
  isLoading: true,
  isLoadingMovieDetail: true,
  isLoadingMovieTickets: true,
  error: null,
};

const movieReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case movieTypes.FETCH_MOVIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case movieTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        danhSachPhim: action.payload,
        phimTimKiem: null,
        isLoading: false,
      };
    case movieTypes.FETCH_MOVIES_ERROR:
      return {
        ...state,
        isLoading: true,
        error: action.payload,
      };
    case movieTypes.FETCH_MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingMovieDetail: true,
      };
    case movieTypes.FETCH_MOVIE_DETAILS:
      return {
        ...state,
        chiTietPhim: action.payload,
        isLoadingMovieDetail: false,
      };
    case movieTypes.FETCH_MOVIE_DETAILS_ERROR:
      return {
        ...state,
        chiTietPhim: null,
        error: action.payload,
      };
    case movieTypes.FETCH_MOVIE_TICKET_REQUEST:
      return {
        ...state,
        isLoadingMovieTickets: true,
      };
    case movieTypes.FETCH_MOVIE_TICKET_SUCCESS:
      return {
        ...state,
        thongTinPhongVe: action.payload,
        isLoadingMovieTickets: false,
      };
    case movieTypes.FETCH_MOVIE_TICKET_ERROR:
      return {
        ...state,
        isLoadingMovieTickets: true,
        error: action.payload,
      };
    case movieTypes.SEARCH_MOVIE_SUCCESS:
      const searchValue = state.danhSachPhim.filter(
        (el) => el.tenPhim === action.payload
      );
      console.log(searchValue);
      return {
        ...state,
        phimTimKiem: searchValue,
      };
    default:
      return state;
  }
};

export default movieReducer;
