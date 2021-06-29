import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { layChiTietPhongVeAction } from "./../../redux/Movies/movie.actions";
import Loading from "./../../components/Loading/Loading";
import StepCheckOut from "./../../components/CheckOut/StepCheckout";
import LeftCheckOut from "../../components/CheckOut/LeftCheckOut";
import DetailsCheckOut from "../../components/CheckOut/DetailsCheckOut";
import SeatCheckOut from "../../components/CheckOut/SeatCheckOut";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const isLoadingMovieTickets = useSelector(
    (state) => state.moviesData.isLoadingMovieTickets
  );
  useEffect(() => {
    dispatch(layChiTietPhongVeAction(maLichChieu));
  }, [maLichChieu]);

  const [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);
  return (
    <div>
      {isLoadingMovieTickets === false ? (
        <>
          {" "}
          <div className="Checkout">
            <div className="row">
              <div className="col-xl-9 pl-0">
                <div className="col-12 pl-0">
                  <StepCheckOut />
                </div>
                <div
                  style={{ minHeight: "calc(100vh - 80px)" }}
                  className="row"
                >
                  <div className="col-xl-1 pl-0">
                    <LeftCheckOut />
                  </div>
                  <div className="col-xl-11 d-flex justify-content-center align-items-center">
                    <SeatCheckOut
                      danhSachGheDangDat={danhSachGheDangDat}
                      setDanhSachGheDangDat={setDanhSachGheDangDat}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 p-0">
                <DetailsCheckOut
                  danhSachGheDangDat={danhSachGheDangDat}
                  maLichChieu={maLichChieu}
                />
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <Loading />{" "}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
