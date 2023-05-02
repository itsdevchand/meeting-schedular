import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/calendar.scss";

import {
  setSelectedDate,
  setSelectedTimeZone,
} from "../redux/features/timeZoneSlice";
import { Axios } from "../axios";

const TimeZone = () => {
  const { allTimeZone, selectedTimeZone } = useSelector(
    (state) => state.timeZone
  );
  const dispatch = useDispatch();
  const selectHandler = (e) => {
    dispatch(setSelectedTimeZone(e.target.value));
  };
  useEffect(() => {
    Axios.get(`/timezone/${selectedTimeZone}`).then((res) => {
      const dateval = new Date(res.data.utc_datetime);
      const day = dateval.toLocaleDateString("en-US", { weekday: "long" });
      const month = dateval.toLocaleDateString("en-US", { month: "long" });
      const daynum = dateval.getDate();
      const yearnum = dateval.getYear();
      const isoString = res.data.datetime;
      const hours = parseInt(isoString.substring(11, 13), 10);

      dispatch(
        setSelectedDate({
          date: res.data.utc_datetime,
          day,
          month,
          daynum,
          yearnum,
          hours,
        })
      );
    });
  }, [selectedTimeZone]);
  return (
    <select
      onChange={selectHandler}
      defaultValue={selectedTimeZone}
      className="w-100 ps-2 bg-transparent border cursor-pointer"
    >
      {allTimeZone.map((item, id) => {
        return (
          <option key={id} className="text-black" value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default TimeZone;
