import { accessToken, USER_LOGIN } from "../../Config/settings";
import userTypes from "./user.types";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const INITIAL_STATE = {
  loading: false,
  isLoadingInfoUser: false,
  currentUser: userLogin,
  errInfoUser: null,
  errSignUp: null,
  errSignIn: null,
  dataSignUp: null,
  infomationUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        errSignIn: null,
      };
    case userTypes.USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        currentUser: null,
        errSignIn: action.payload,
      };
    case userTypes.USER_CLEAR_DATA:
      return {
        ...state,
        loading: false,
        currentUser: null,
        err: null,
        errSignIn: null,
        dataSignUp: null,
      };
    case userTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        dataSignUp: action.payload,
        errSignUp: null,
      };
    case userTypes.USER_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        dataSignUp: null,
        errSignUp: action.payload,
      };
    case userTypes.USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userTypes.USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoading: false,
        infomationUser: action.payload,
      };
    case userTypes.USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        errInfoUser: action.payload,
        infomationUser: null,
      };
    case userTypes.USER_LOGOUT:
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(accessToken);
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};
export default userReducer;
