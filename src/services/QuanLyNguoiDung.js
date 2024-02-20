import { GROUPID } from "../util/Setting/config";
import { BaseServices } from "./baseServices";

export class QuanLyNguoiDungService extends BaseServices {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  layThongTinNguoiDung = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  capNhatThongTinNguoiDung = (thongTinCapNhat) => {
    return this.put(
      `api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      thongTinCapNhat
    );
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}`);
  };
  capNhatThongTinNguoiDungAdmin = (thongTinCapNhatAdmin) => {
    return this.post(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      thongTinCapNhatAdmin
    );
  };
  layDanhSachLoaiNguoiDung = () => {
    return this.get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  };
  layThongTinMotNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}`);
  };
  themNguoiDung = (newUser) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, newUser);
  };
  xoaNguoiDung = (TaiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
