import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import {
  chuyenTab,
  datVe,
  datVeHoanTat,
  displayLoading,
  hideLoading,
  setChiTietPhongVe,
} from "../reducers/CarouselReducer";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { connection } from "../../index";
export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      console.log(res);
      if (res.data.statusCode === 200) {
        dispatch({
          type: setChiTietPhongVe,
          chiTietPhongVe: res?.data?.content,
        });
      }
    } catch (error) {
      console.log(error);
      console.log("error", error.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: displayLoading,
      });
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      //Đặt vé thành công gọi api load lại phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: datVeHoanTat });
      await dispatch({
        type: hideLoading,
      });

      let userLogin = getState().CarouselReducer.userLogin;
      connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        thongTinDatVe.maLichChieu
      );
      await dispatch({ type: chuyenTab });
    } catch (error) {
      dispatch({
        type: hideLoading,
      });
      console.log(error);
      console.log(error?.response?.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: datVe,
      gheDuocChon: ghe,
    });

    //Call api về backend
    let danhSachGheDangDat = getState().CarouselReducer.danhSachGheDangDat;
    let taiKhoan = getState().CarouselReducer.userLogin.taiKhoan;

    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
