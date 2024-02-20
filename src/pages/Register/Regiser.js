import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Regiser() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userRegister } = useSelector((state) => state.CarouselReducer);
  console.log("userRegister", userRegister);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      rePassword: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "GP00",
    },
    onSubmit: (values) => {
      const action = dangKyAction(values, navigate);
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
          {t("Đăng ký")}
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
              Mật khẩu
            </label>
            <input
              placeholder="Nhập mật khẩu"
              onChange={formik.handleChange}
              name="matKhau"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Nhập lại mật khẩu
            </label>
            <input
              placeholder="Nhập lại mật khẩu"
              onChange={formik.handleChange}
              name="rePassword"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Họ Tên
            </label>
            <input
              placeholder="Nhập họ tên"
              onChange={formik.handleChange}
              name="hoTen"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              placeholder="Nhập email"
              onChange={formik.handleChange}
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="sdt"
              className="block text-sm font-semibold text-gray-800"
            >
              Số Điện Thoại
            </label>
            <input
              placeholder="Nhập SDT"
              onChange={formik.handleChange}
              name="soDt"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <NavLink to={"#"} className="text-xs text-purple-600 hover:underline">
            Quên mật khẩu?
          </NavLink>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Đăng Ký
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Bạn đã có tài khoản?
          <NavLink
            to={"/login"}
            className="font-medium text-purple-600 hover:underline"
          >
            Đăng Nhập
          </NavLink>
        </p>
      </div>
    </form>
  );
}
