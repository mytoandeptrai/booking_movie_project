import { Route, Switch } from "react-router-dom";
import CheckOutPage from "./Pages/CheckOutPage";
import CustomerInfos from "./Pages/CustomerInfos";
import CustomerManager from "./Pages/CustomerManager";
import HomePage from "./Pages/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import MovieManager from "./Pages/MovieManager";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp/index";
import { AdminTemplate } from "./Templates/AdminTemplate";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/chitietphim/:maPhim">
          <MovieDetails />
        </Route>
        <Route path="/datve/:maLichChieu">
          <CheckOutPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/ThongTinTaiKhoan">
          <CustomerInfos />
        </Route>
        <AdminTemplate
          path="/admin/NguoiDungManager"
          Component={CustomerManager}
        />

        <AdminTemplate path="/admin/PhimManager" Component={MovieManager} />
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
