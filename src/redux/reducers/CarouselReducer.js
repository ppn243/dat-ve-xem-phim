import { createSlice } from "@reduxjs/toolkit";
import {
  THONG_TIN_NGUOI_DUNG,
  TOKEN,
  USER_LOGIN,
  USER_REGISTER,
} from "../../util/Setting/config";
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  arrFilm: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  heThongRapChieu: [],
  filmDetail: {},
  userLogin: user,
  userRegister: {},
  thongTinNguoiDung: {},
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  tabActive: "1",
  isLoading: false,
  thongTinPhim: {},
  thongTinCapNhat: {},
  thongTinTaiKhoan: {},
  arrUser: [],
  arrUserSearch: [],
  thongTinCapNhatAdmin: {},
  arrTypeUser: [],
  userInfo: {},
};

export const CarouselReducer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    SET_CAROUSEL: (state, action) => {
      state.arrImg = action.arrImg;
    },
    SET_DANH_SACH_PHIM: (state, action) => {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = [...state.arrFilm];
    },
    SET_FILM_DANG_CHIEU: (state) => {
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
    },
    SET_FILM_SAP_CHIEU: (state) => {
      state.sapChieu = !state.sapChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
    },
    setHeThongRapChieu: (state, action) => {
      state.heThongRapChieu = action.heThongRapChieu;
    },
    setChiTietPhim: (state, action) => {
      state.filmDetail = action.filmDetail;
    },
    dangNhap: (state, action) => {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      state.userLogin = thongTinDangNhap;
    },
    setChiTietPhongVe: (state, action) => {
      state.chiTietPhongVe = action.chiTietPhongVe;
    },
    datVe: (state, action) => {
      const { danhSachGheDangDat } = state;
      const { gheDuocChon } = action;

      const index = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === gheDuocChon.maGhe
      );
      if (index !== -1) {
        state.danhSachGheDangDat = danhSachGheDangDat.filter(
          (gheDD) => gheDD.maGhe !== gheDuocChon.maGhe
        );
      } else {
        state.danhSachGheDangDat.push(gheDuocChon);
      }
    },
    datVeHoanTat: (state) => {
      state.danhSachGheDangDat = [];
    },
    chuyenTab: (state) => {
      state.tabActive = "2";
    },
    changeTabActive: (state, action) => {
      console.log(action);
      state.tabActive = action.number;
    },
    datGhe: (state, action) => {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
    },
    setThongTinNguoiDung: (state, action) => {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
    },
    displayLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setThongTinPhim: (state, action) => {
      state.thongTinPhim = action.thongTinPhim;
    },
    dangKy: (state, action) => {
      const { thongTinDangKy } = action;
      state.userRegister = thongTinDangKy;
    },
    thongTinCapNhat: (state, action) => {
      const { thongTinCapNhat } = action;
      state.userRegister = thongTinCapNhat;
    },
    layDanhSachNguoiDung: (state, action) => {
      state.arrUser = action.arrUser;
      state.arrUserSearch = [...state.arrUser];
    },
    updateThongTinCapNhatAdmin: (state, action) => {
      const { thongTinCapNhatAdmin } = action;
      state.thongTinCapNhatAdmin = thongTinCapNhatAdmin;
    },
    getLoaiNguoiDung: (state, action) => {
      state.arrTypeUser = action.arrTypeUser;
    },
    layMotNguoiDung: (state, action) => {
      const { userInfo } = action;
      state.userInfo = userInfo;
    },
  },
});

export const {
  SET_CAROUSEL,
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  setHeThongRapChieu,
  setChiTietPhim,
  dangNhap,
  setChiTietPhongVe,
  datVe,
  datVeHoanTat,
  chuyenTab,
  changeTabActive,
  datGhe,
  setThongTinNguoiDung,
  displayLoading,
  hideLoading,
  setThongTinPhim,
  dangKy,
  thongTinCapNhat,
  thongTinTaiKhoan,
  layDanhSachNguoiDung,
  updateThongTinCapNhatAdmin,
  getLoaiNguoiDung,
  layMotNguoiDung,
} = CarouselReducer.actions;

export default CarouselReducer.reducer;
