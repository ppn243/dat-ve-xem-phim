import { quanLyRapService } from "../../services/QuanLyRapService";
import {
  setChiTietPhim,
  setHeThongRapChieu,
} from "../reducers/CarouselReducer";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.layDanhSachHeThongRap();
      if (res.status === 200) {
        dispatch({
          type: setHeThongRapChieu,
          heThongRapChieu: res.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.layThongTinLichChieuPhim(id);
      dispatch({
        type: setChiTietPhim,
        filmDetail: res.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
