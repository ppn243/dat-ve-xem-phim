import React, { useEffect, Fragment } from "react";
import { Table, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
export default function User() {
  const { arrUserSearch } = useSelector((state) => state.CarouselReducer);
  const data = arrUserSearch;
  const dispatch = useDispatch();

  const onSearch = (value, _e, info) => {
    console.log(value);
    dispatch(layDanhSachNguoiDungAction(value));
  };

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "15%",
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoTen",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      width: "15%",
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
      width: "15%",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className=" mr-2  text-2xl"
              to={`/admin/users/edit/${user.taiKhoan}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
              onClick={() => {
                //Gọi action xoá
                if (
                  window.confirm(
                    "Bạn có chắc muốn xoá tài khoản " + user.taiKhoan
                  )
                ) {
                  //Gọi action
                  dispatch(xoaNguoiDungAction(user.taiKhoan));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />{" "}
            </span>
          </Fragment>
        );
      },
      width: "20%",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h3 className="text-center text-4xl font-bold">All User</h3>
      <NavLink className="text-2xl" to={`/admin/users/addnew`}>
        <PlusOutlined style={{ color: "blue" }} />
        Add User
      </NavLink>
      <Search className="my-5" onSearch={onSearch} />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
