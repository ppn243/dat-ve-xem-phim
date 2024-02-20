import React, { useEffect, useState } from "react";
import { Tabs, Input, Form, Card, Select } from "antd";
import { useFormik } from "formik";
import {
  capNhatThongTinNguoiDungAction,
  layDanhSachLoaiNguoiDungAction,
  layThongTinNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { useSelector, useDispatch } from "react-redux";
import { KetQuaDatVe } from "../Checkout/Checkout";

export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);
  const { thongTinNguoiDung, arrTypeUser } = useSelector(
    (state) => state.CarouselReducer
  );

  console.log("thongTinNguoiDung", thongTinNguoiDung);
  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung?.taiKhoan,
      matKhau: thongTinNguoiDung?.matKhau,
      hoTen: thongTinNguoiDung?.hoTen,
      email: thongTinNguoiDung?.email,
      soDT: thongTinNguoiDung?.soDT,
      maLoaiNguoiDung: thongTinNguoiDung?.loaiNguoiDung,
      maNhom: "GP00",
    },
    onSubmit: (values) => {
      console.log(values);
      const action = capNhatThongTinNguoiDungAction(values);
      dispatch(action);
    },
  });

  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        <Form
          onFinish={formik.handleSubmit}
          className="grid grid-cols-2 gap-4  container mx-auto"
          layout={"vertical"}
          form={form}
          initialValues={{
            layout: "vertical",
          }}
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item label="Email">
            <Input
              disabled
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Tài Khoản">
            <Input
              disabled
              name="taiKhoan"
              value={formik.values.taiKhoan}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Họ Tên">
            <Input
              disabled
              name="hoTen"
              value={formik.values.hoTen}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Mật Khẩu">
            <Input
              autoComplete="off"
              type="password"
              name="matKhau"
              value={formik.values.matKhau}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Số Điện Thoại">
            <Input
              disabled
              name="soDT"
              value={formik.values.soDT}
              onChange={formik.handleChange}
            />
          </Form.Item>
          <Form.Item label="Loại tài khoản">
            <Select
              disabled
              name="maLoaiNguoiDung"
              value={formik.values.maLoaiNguoiDung}
              onChange={(value) =>
                formik.setFieldValue("maLoaiNguoiDung", value)
              }
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
          <Form.Item className="col-span-2">
            {/* <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Cập nhật
            </button> */}
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Lịch sử đặt vé",
      children: (
        // <Card>
        //   <Card
        //     type="inner"
        //     title="Inner Card title"
        //     extra={<a href="#">More</a>}
        //   >
        //     Inner Card content
        //   </Card>
        //   <Card
        //     style={{
        //       marginTop: 16,
        //     }}
        //     type="inner"
        //     title="Inner Card title"
        //     extra={<a href="#">More</a>}
        //   >
        //     Inner Card content
        //   </Card>
        // </Card>
        <KetQuaDatVe />
      ),
    },
  ];
  return (
    <div className="container mx-auto">
      <h3 className="font-bold text-4xl text-center ">Profile</h3>
      <Tabs className="mt-10" defaultActiveKey="1" items={items} />
    </div>
  );
}
