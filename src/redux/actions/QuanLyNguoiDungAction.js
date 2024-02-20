import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import {
  dangKy,
  dangNhap,
  getLoaiNguoiDung,
  layDanhSachNguoiDung,
  layMotNguoiDung,
  setThongTinNguoiDung,
  updateThongTinCapNhatAdmin,
} from "../reducers/CarouselReducer";

export const dangNhapAction = (thongTinDangNhap, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (res.data.statusCode === 200) {
        dispatch({
          type: dangNhap,
          thongTinDangNhap: res.data.content,
        });
        navigate("/home");
      }
    } catch (error) {
      alert(error?.response.data.content);
      console.log(error);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      console.log("thong tin tai khoan", result);
      if (result.data.statusCode === 200) {
        dispatch({
          type: setThongTinNguoiDung,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const dangKyAction = (thongTinDangKy, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      if (res.data.statusCode === 200) {
        dispatch({
          type: dangKy,
          thongTinDangKy: res.data.content,
        });
        navigate("/login");
      }
    } catch (error) {
      alert(error?.response.data.content);
      console.log(error);
    }
  };
};

export const capNhatThongTinNguoiDungAction = (thongTinCapNhat) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        thongTinCapNhat
      );
      if (res.data.statusCode === 200) {
        dispatch({
          type: thongTinCapNhat,
          thongTinCapNhat: res.data.content,
        });
      }
    } catch (error) {
      // alert(error?.response.data.content);
      console.log(error);
    }
  };
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);

      dispatch({
        type: layDanhSachNguoiDung,
        arrUser: res?.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const layDanhSachMotNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      console.log("ho ten", tuKhoa);
      const res = await quanLyNguoiDungService.layThongTinMotNguoiDung(tuKhoa);

      dispatch({
        type: layMotNguoiDung,
        userInfo: res?.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const capNhatThongTinNguoiDungAdminAction = (thongTinCapNhatAdmin) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(
        thongTinCapNhatAdmin
      );
      if (res.data.statusCode === 200) {
        dispatch({
          type: updateThongTinCapNhatAdmin,
          thongTinCapNhatAdmin: res.data.content,
        });
      }
    } catch (error) {
      // alert(error?.response.data.content);
      console.log(error);
    }
  };
};

export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();

      if (result.data.statusCode === 200) {
        dispatch({
          type: getLoaiNguoiDung,
          arrTypeUser: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const themNguoiDungAction = (newUser) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(newUser);
      console.log(result);
      alert("Thêm user mới thành công!");
    } catch (error) {
      console.log(error);
    }
  };
};

export const xoaNguoiDungAction = (TaiKhoan) => {
  console.log(TaiKhoan);
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(TaiKhoan);
      if (result.data.statusCode === 200) {
        alert("Xoá user thành công!");
        dispatch(layDanhSachNguoiDungAction());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
