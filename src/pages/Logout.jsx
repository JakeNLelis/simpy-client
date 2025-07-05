import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.changeCurrentUser({}));
    localStorage.setItem("currentUser", JSON.stringify({}));
    navigate("/login");
  }, [dispatch, navigate]);
  return <div>Logout</div>;
}

export default Logout;
