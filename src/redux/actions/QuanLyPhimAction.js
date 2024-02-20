import { managerCenemaService } from "../../services/ManagerCinemaService";
import {
  SET_DANH_SACH_PHIM,
  setThongTinPhim,
} from "../reducers/CarouselReducer";
export const layDanhSachPhimAction = (tenphim = "", navigate) => {
  return async (dispatch) => {
    try {
      const res = await managerCenemaService.layDanhSachPhim(tenphim);
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: res.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await managerCenemaService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData, navigate) => {
  return async (dispatch) => {
    try {
      let result = await managerCenemaService.capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công!");
      console.log("result", result.data.content);

      dispatch(layDanhSachPhimAction());
      navigate("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await managerCenemaService.layThongTinPhim(maPhim);
      console.log(result.data.content);
      dispatch({
        type: setThongTinPhim,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await managerCenemaService.xoaPhim(maPhim);
      console.log("result", result.data.content);
      alert("Xoá phim thành công !");
      //Sau khi xoá load lại danh sách phim mới;
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
