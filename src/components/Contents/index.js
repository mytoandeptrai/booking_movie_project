import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimApiAction } from "../../redux/Movies/movie.actions";
import IconContent from "./IconContent";
import MovieSection from "./MoiveSection";
import Services from "./Services";
import BlackContent from "./BlackContent";
import TheaterSection from "./Theaters";
const HomeContents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimApiAction());
  }, []);
  const danhSachPhim = useSelector((state) => state.moviesData.danhSachPhim);

  return (
    <>
      <div className="content-page">
        <IconContent />
        <MovieSection danhSachPhim={danhSachPhim} />
        <TheaterSection />
        <Services />
        <BlackContent />
      </div>
    </>
  );
};

export default HomeContents;
