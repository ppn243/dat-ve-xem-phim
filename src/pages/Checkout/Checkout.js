import React, { useEffect, useState, Fragment } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./Checkout.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import style from "./Checkout.module.css";
import { Tabs } from "antd";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { TOKEN, USER_LOGIN } from "../../util/Setting/config";
import { useNavigate } from "react-router-dom";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import {
  changeTabActive,
  datGhe,
  datVe,
} from "../../redux/reducers/CarouselReducer";
import { connection } from "../..";
function Checkout(props) {
  let dispatch = useDispatch();
  let { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat, userLogin } =
    useSelector((state) => state.CarouselReducer);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(layChiTietPhongVeAction(id));
    connection.on("datVeThanhCong", () => {
      dispatch(layChiTietPhongVeAction(id));
    });
    connection.invoke("loadDanhSachGhe", id);
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );

      let arrGheKhachDat = dsGheKhachDat.reduce((res, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...res, ...arrGhe];
      }, []);
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      dispatch({
        type: datGhe,
        arrGheKhachDat,
      });
    });

    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, id);
  };
  let { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  let renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      if (indexGheDD !== -1) {
        classGheDaDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(datGheAction(ghe, id));
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheKhachDat} ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`}
          >
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className="w-2/3 divide-y divide-gray-200">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="text-center">
                  <td>
                    <button className="ghe text-center ">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-4xl text-green-500">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ
          </h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p className="mt-3">
            Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p className="mt-3">
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Ghế</span>
              {_.sortBy(danhSachGheDangDat, [
                (gheDD) => parseInt(gheDD.stt),
              ]).map((gheDD, index) => {
                return (
                  <span
                    style={{ margin: "0 5px 0 5px" }}
                    key={index}
                    className="text-green-500 text-xl "
                  >
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0 h-full flex flex-col items-center">
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="cursor-pointer bg-green-500 text-white w-full text-center py-3 font-bold text-2xl"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    key: "1",
    label: "01 CHỌN GHẾ & THANH TOÁN",
    children: <Checkout />,
  },
  {
    key: "2",
    label: "02 KẾT QUẢ ĐẶT VÉ",
    children: <KetQuaDatVe />,
  },
  {
    key: "3",
    label: (
      <div
        className="text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink to="/">
          <HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} />
        </NavLink>
      </div>
    ),
  },
];
export default function CheckoutTab() {
  let { userLogin } = useSelector((state) => state.CarouselReducer);
  useEffect(() => {
    return () => {
      dispatch({
        type: changeTabActive,
        number: "1",
      });
    };
  }, []);
  const navigate = useNavigate();
  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
            Hello ! {userLogin.taiKhoan}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              navigate("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  const dispatch = useDispatch();
  const { tabActive } = useSelector((state) => state.CarouselReducer);
  return (
    <div className="pt-5 pl-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        items={items}
        onChange={(key) => {
          dispatch({
            type: changeTabActive,
            number: key,
          });
        }}
      />
      ;
    </div>
  );
}

export function KetQuaDatVe(props) {
  let dispatch = useDispatch();
  let { thongTinNguoiDung, userLogin } = useSelector(
    (state) => state.CarouselReducer
  );
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);
  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src="https://dummyimage.com/80x80"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span className="font-bold">Giờ chiếu:</span>
                {moment(ticket.ngayDat).format("hh:mm A")} -
                <span className="font-bold">Ngày chiếu:</span>
                {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>
                <span className="font-bold">Địa điểm:</span>
                {seats.tenHeThongRap}
              </p>
              <p>
                <span className="font-bold">Tên rạp:</span> {seats.tenCumRap} -
                <span className="font-bold">Ghế:</span>
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-500 text-xl" key={index}>
                      [ {ghe.tenGhe} ]
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn
              nhé!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
