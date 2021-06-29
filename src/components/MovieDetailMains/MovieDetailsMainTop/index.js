import React from "react";
import "./style.scss";
import MovieDetailsMainInfo from "./MovieDetailsMainInfo/index";
const MovieDetailsMainTop = ({ movieDetail }) => {
  return (
    <>
      <div className="movie__detail__top">
        <img
          className="movie__detail__top__bg"
          src={movieDetail?.hinhAnh}
          alt={movieDetail?.biDanh}
        />
        <div className="movie__detail__top__blurred"></div>
        <div className="movie__detail__top__styleGradient"></div>
        <div className="movie__detail__top__info d-flex flex-row justify-content-center align-items-center">
          <MovieDetailsMainInfo movieDetail={movieDetail} />
        </div>
      </div>
    </>
  );
};

export default MovieDetailsMainTop;
