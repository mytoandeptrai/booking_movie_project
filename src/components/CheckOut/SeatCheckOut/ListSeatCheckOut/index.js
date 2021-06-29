import React from "react";
import "./style.scss";
const ListSeatCheckOut = ({
  classLoaiGhe,
  classGheDaChon,
  classGheDangDat,
  datGhe,
  tenGhe,
  ghe,
}) => {
  const disableButton = (key) => {
    if (
      key ===
      "list__seat__item list__seat__item__selected list__seat__item__cursor"
    ) {
      return true;
    }
  };
  return (
    <>
      <div className="list__seat">
        <div
          className={`list__seat__item ${classLoaiGhe} ${classGheDangDat} ${classGheDaChon} `}
        >
          <button
            className="list__seat__item__btn"
            disabled={disableButton(classGheDaChon)}
            onClick={() => datGhe(ghe)}
          >
            <span className="list__seat__item__btn__tittle ">{tenGhe}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListSeatCheckOut;
