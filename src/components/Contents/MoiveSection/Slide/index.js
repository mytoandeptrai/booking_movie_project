import React, { useRef } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
const Slide = ({ slide, offset }) => {
  const useTilt = (active) => {
    const ref = useRef(null);
    useEffect(() => {
      if (!ref.current || !active) {
        return;
      }

      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined,
      };

      let el = ref.current;

      const handleMouseMove = (e) => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;

        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };

      el.addEventListener("mousemove", handleMouseMove);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);

    return ref;
  };
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.hinhAnh}')`,
        }}
      />

      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.hinhAnh}')`,
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.tenPhim}</h2>
          <NavLink className="slideLink" to={`/chitietphim/${slide.maPhim}`}>
            Chi tiết
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Slide;
