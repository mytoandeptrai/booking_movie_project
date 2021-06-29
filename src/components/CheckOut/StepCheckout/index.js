import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const StepCheckOut = () => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  return (
    <>
      <div className="StepCheckout">
        <div className="StepCheckout__step">
          <ul>
            <li className="active">
              <span>01</span>
              <span>CHỌN GHẾ & THANH TOÁN</span>
            </li>
            <li>
              <span>02</span>
              <span>KẾT QUẢ ĐẶT VÉ</span>
            </li>
          </ul>
        </div>
        <div className="StepCheckout__account">
          <p>{currentUser?.hoTen}</p>
        </div>
      </div>
    </>
  );
};

export default StepCheckOut;
