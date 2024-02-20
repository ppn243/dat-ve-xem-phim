import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values, navigate);
      dispatch(action);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Tài Khoản
            </label>
            <input
              placeholder="Nhập tài khoản"
              onChange={formik.handleChange}
              name="taiKhoan"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Mật Khẩu
            </label>
            <input
              placeholder="Nhập mật khẩu"
              onChange={formik.handleChange}
              name="matKhau"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <NavLink to={"#"} className="text-xs text-purple-600 hover:underline">
            Quên mật khẩu?
          </NavLink>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Đăng Nhập
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Bạn chưa có tài khoản?{" "}
          <NavLink
            to={"/register"}
            className="font-medium text-purple-600 hover:underline"
          >
            Đăng Ký
          </NavLink>
        </p>
      </div>
    </form>
  );
}
