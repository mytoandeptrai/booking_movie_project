import React, { useReducer } from "react";
import Slide from "./Slide";
import "./style.scss";
const MovieSection = ({ danhSachPhim }) => {
  // lấy 15 phim nổi bật
  const phimNoiBat = danhSachPhim.slice(15, 30);
  // gán phimNoiBat cho biến slides để thiết kế slider
  const slides = [...phimNoiBat];

  const initialState = {
    slideIndex: 0,
  };

  const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
      };
    }
  };
  const [state, dispatch] = useReducer(slidesReducer, initialState);
  const slideHienThi = [...slides, ...slides, ...slides];
  return (
    <>
      <div className="slides" id="phim">
        <button onClick={() => dispatch({ type: "PREV" })}> ‹ </button>
        {slideHienThi.map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}> › </button>
      </div>
    </>
  );
};

export default MovieSection;
