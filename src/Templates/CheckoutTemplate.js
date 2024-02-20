import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { USER_LOGIN } from "../util/Setting/config";
import { useNavigate } from "react-router-dom";
export default function CheckoutTemplate() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const accessToken = localStorage.getItem(USER_LOGIN);
    if (!accessToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}
