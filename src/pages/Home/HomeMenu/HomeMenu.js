import React, { Fragment, useEffect, useState } from "react";
import { Tabs } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

export default function HomeMenu({ heThongRapChieu }) {
  const [tabPosition, setTabPosition] = useState("left");
  useEffect(() => {
    // Effect hook nếu cần
  }, []);

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => (
      <TabPane
        tab={<img src={heThongRap.logo} className="rounded-full" width="50" />}
        key={index}
      >
        <Tabs tabPosition={tabPosition}>
          {heThongRap.lstCumRap?.map((cumRap, cumRapIndex) => (
            <TabPane
              tab={
                <div style={{ width: "300px", display: "flex" }}>
                  <img
                    src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
                    width="50"
                  />{" "}
                  <br />
                  <div className="text-left ml-2">
                    {cumRap.tenCumRap}
                    <p className="text-red-200">Chi tiết</p>
                  </div>
                </div>
              }
              key={cumRapIndex}
            >
              {/* Load thông tin các phim tương ứng */}
              {cumRap.danhSachPhim.slice(0, 4).map((phim, phimIndex) => (
                <Fragment key={phimIndex}>
                  <div className="my-5">
                    <div style={{ display: "flex" }}>
                      <img
                        style={{ height: 75, width: 75 }}
                        src={phim.hinhAnh}
                        alt={phim.tenPhim}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://picsum.photos/75/75";
                        }}
                      />
                      <div className="ml-2">
                        <h1 className="text-2xl text-green-700">
                          {phim.tenPhim}
                        </h1>
                        <p>{cumRap.diaChi}</p>
                        <div className="grid grid-cols-6 gap-6">
                          {/* Hiển thị danh sách lịch chiếu của phim */}
                          {phim.lstLichChieuTheoPhim
                            ?.slice(0, 12)
                            .map((lichChieu, lichChieuIndex) => (
                              <NavLink
                                className="text-2xl text-green-400"
                                to={`/checkout/${lichChieu.maLichChieu}`}
                                key={lichChieuIndex}
                              >
                                {moment(lichChieu.ngayChieuGioChieu).format(
                                  "hh:mm A"
                                )}
                              </NavLink>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };

  return <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>;
}
