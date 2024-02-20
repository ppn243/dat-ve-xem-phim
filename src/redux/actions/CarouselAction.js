import { SET_CAROUSEL } from "../reducers/CarouselReducer";

import { managerCenemaService } from "../../services/ManagerCinemaService";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const res = await managerCenemaService.layDanhSachBanner();

      dispatch({
        type: SET_CAROUSEL,
        arrImg: res.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
