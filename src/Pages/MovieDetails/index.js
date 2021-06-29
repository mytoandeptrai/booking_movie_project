import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { layChiTietPhimAction } from "../../redux/Movies/movie.actions";
import Loading from "./../../components/Loading/Loading";
import MovieDetailsMainTop from "./../../components/MovieDetailMains/MovieDetailsMainTop/index";
import MovieDetailsMainContent from "./../../components/MovieDetailMains/MovieDetailsMainContent/index";
import Navbar from "../../components/Navbar";
const MovieDetails = () => {
  const dispatch = useDispatch();
  const { maPhim } = useParams();
  const movieDetail = useSelector((state) => state.moviesData.chiTietPhim);
  const isLoadingMovieDetail = useSelector(
    (state) => state.moviesData.isLoadingMovieDetail
  );
  useEffect(() => {
    dispatch(layChiTietPhimAction(maPhim));
  }, [maPhim]);

  return (
    <>
      {isLoadingMovieDetail === false ? (
        <>
          <MovieDetailsMainTop movieDetail={movieDetail} />
          <MovieDetailsMainContent movieDetail={movieDetail} maPhim={maPhim} />
        </>
      ) : (
        <>
          {" "}
          <Loading />{" "}
        </>
      )}
    </>
  );
};

export default MovieDetails;
