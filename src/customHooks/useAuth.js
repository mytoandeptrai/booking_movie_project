import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER_LOGIN } from "../Config/settings";

const useAuth = () => {
  const currentUser = useSelector((state) => state.usersData.currentUser);
  const history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
