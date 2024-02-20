import { configureStore } from "@reduxjs/toolkit";
import CarouselReducer from "./reducers/CarouselReducer";

export const store = configureStore({
  reducer: {
    CarouselReducer,
  },
});
