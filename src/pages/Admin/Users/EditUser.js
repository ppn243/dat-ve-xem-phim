import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Input, Select } from "antd";
import {
  capNhatThongTinNguoiDungAdminAction,
  layDanhSachLoaiNguoiDungAction,
  layDanhSachMotNguoiDungAction,
  layDanhSachNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
export default function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { arrTypeUser, userInfo } = useSelector(
    (state) => state.CarouselReducer
  );
  console.log(userInfo[0]);
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
    dispatch(layDanhSachMotNguoiDungAction(id));
  }, [dispatch, id]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const data = userInfo[0];
  const formik = useFormik({
    initialValues: {
      taiKhoan: data?.taiKhoan,
      matKhau: data?.matKhau,
      email: data?.email,
      soDt: data?.soDt,
      maNhom: "GP00",
      maLoaiNguoiDung: data?.maLoaiNguoiDung,
      hoTen: data?.hoTen,
    },
    onSubmit: (values) => {
      console.log(values);
      // const action = dangKyAction(values, navigate);
      dispatch(capNhatThongTinNguoiDungAdminAction(values));
    },
  });

  return (
    <>
      <h3 className="text-center font-bold text-4xl">Edit User</h3>
      <Form
        onFinish={formik.handleSubmit}
        {...layout}
        name="nest-messages"
        style={{
          marginTop: "50px",
          maxWidth: 1200,
        }}
      >
        <Form.Item label="Tài Khoản">
          <Input
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Họ và tên">
          <Input
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            autoComplete="off"
            type="password"
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Loại tài khoản">
          <Select
            name="maLoaiNguoiDung"
            value={formik.values.maLoaiNguoiDung}
            onChange={(value) => formik.setFieldValue("maLoaiNguoiDung", value)}
          >
            {arrTypeUser.map((type, index) => {
              return (
                <Select.Option key={index} value={type.maLoaiNguoiDung}>
                  {type.tenLoai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Update
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
