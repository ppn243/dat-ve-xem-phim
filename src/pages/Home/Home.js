import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
// import Film from "../../components/Film/Film";
import { useSelector, useDispatch } from "react-redux";
import MultipleRows from "../../components/RSlick/MultipleRowsSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/LayDanhSachHeThongRapAction";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
export default function Home() {
  const { arrFilm, heThongRapChieu } = useSelector(
    (state) => state.CarouselReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <>
      <HomeCarousel />
      <div className="container mx-auto">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <MultipleRows arrFilm={arrFilm} />
          </div>
        </section>

        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </>
  );
}
