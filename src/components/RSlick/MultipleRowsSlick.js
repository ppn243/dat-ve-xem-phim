import React from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FILM_SAP_CHIEU,
  SET_FILM_DANG_CHIEU,
} from "../../redux/reducers/CarouselReducer";
function MultipleRows(props) {
  const { dangChieu, sapChieu } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      ></div>
    );
  };
  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick["slick-prev"]}`}
        style={{ ...style, display: "block", left: "-50px" }}
        onClick={onClick}
      ></div>
    );
  };
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        <div className="mt-2" key={index}>
          <Film_Flip phim={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container">
      <button
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`}
        onClick={() => {
          dispatch(SET_FILM_DANG_CHIEU());
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`}
        onClick={() => {
          dispatch(SET_FILM_SAP_CHIEU());
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
}

export default MultipleRows;
