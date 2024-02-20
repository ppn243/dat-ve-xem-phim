import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, InputNumber, Select } from "antd";
import {
  layDanhSachLoaiNguoiDungAction,
  themNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
export default function AddUser() {
  const dispatch = useDispatch();

  const { arrTypeUser } = useSelector((state) => state.CarouselReducer);
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);
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

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maNhom: "GP00",
    },
    onSubmit: (values) => {
      console.log(values);
      const action = themNguoiDungAction(values);
      dispatch(action);
    },
  });
  return (
    <>
      <h3 className="text-center font-bold text-4xl">Add User</h3>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={formik.handleSubmit}
        style={{
          marginTop: "50px",
          maxWidth: 1200,
        }}
      >
        <Form.Item label="Tài Khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Họ và tên">
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input name="soDt" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            autoComplete="off"
            type="password"
            name="matKhau"
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
            Add New User
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
