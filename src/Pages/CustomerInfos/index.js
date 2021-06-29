import React, { useState } from "react";
import UserContent from "../../components/UserInfos/UserContent";
import UserMenu from "../../components/UserInfos/UserMenu";
import { USER_LOGIN } from "../../Config/settings";
import { Redirect } from "react-router-dom";
import "./style.scss";
const CustomerInfos = () => {
  const [active, setActive] = useState("account_info");

  return (
    <>
      <div className="accountInfo-container">
        {localStorage.getItem(USER_LOGIN) ? (
          <div className="accountInfo-wrapper">
            <UserMenu active={active} setActive={setActive} />
            <UserContent active={active} />
          </div>
        ) : (
          <>
            {/* <h2>Bạn chưa đăng nhập</h2> */}
            <Redirect to="/" />
          </>
        )}
      </div>
    </>
  );
};

export default CustomerInfos;
