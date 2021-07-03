import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER_LOGIN } from "../Config/settings";

const useAdminAuth = () => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const maLoaiNguoiDung = currentUser.maLoaiNguoiDung;
  const history = useHistory();

  useEffect(() => {
    if (maLoaiNguoiDung !== "QuanTri") {
      history.push("/signin");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuth;
