import { combineReducers } from "redux";
import movieReducer from "./Movies/movie.reducer";
import theaterReducer from "./Theaters/theater.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  moviesData: movieReducer,
  theatersData: theaterReducer,
  usersData: userReducer,
});

export default rootReducer;
