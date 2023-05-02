import { useState } from "react";
import SideProfile from "../components/SideProfile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/styles/calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../redux/features/timeZoneSlice";
import TimeList from "../components/TimeList";
import { useParams } from "react-router-dom";
import {
  twelveHourFormat,
  twentyFourFormat,
} from "../functions/timeMinuteFormat";

import { setNewDate } from "../redux/features/rescheduleSlice";
const MainSchedule = () => {
  const { id } = useParams();

  const { selectedDate } = useSelector((state) => state.timeZone);
  const { rescheduleData } = useSelector((state) => state.reschedule);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const currentDate = new Date();

  // on calender date clicked
  const onChange = (date) => {
    console.log(date.id);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const daynum = date.getDate();
    const yearnum = date.getFullYear();
    const dated = new Date(date);
    const newDate = dated.getDate();
    const hours = date.getHours();

    dispatch(
      setSelectedDate({ newDate, date, day, month, daynum, yearnum, hours })
    );
    rescheduleData && dispatch(setNewDate({ day, month, yearnum, daynum }));
  };

  const disableHoliday = ({ date }) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
  };

  const disablePrevious = ({ date }) => {
    if (date < currentDate) {
      return "previous-date";
    }
  };

  const handleClickDay = () => {
    setToggle(true);
  };
  return (
    <div
      style={{
        marginTop: "200px",
      }}
      className="d-flex justify-content-center mx-5"
    >
      <div
        className={`${toggle ? "w-100" : "w-50"} d-flex`}
        style={{
          height: "600px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <SideProfile />

        <div className="w-50">
          <Calendar
            className={`${toggle ? "" : "rounded-end"}`}
            value={selectedDate}
            onClickDay={handleClickDay}
            onChange={onChange}
            minDate={currentDate}
            tileDisabled={disableHoliday}
            tileClassName={disablePrevious}
          />
        </div>
        {toggle && (
          <TimeList
            twelveHour={
              id === "30min"
                ? twelveHourFormat.thirty
                : twelveHourFormat.fifteen
            }
            twentyFourHour={
              id === "30min"
                ? twentyFourFormat.thirty
                : twentyFourFormat.fifteen
            }
            time={id === "30min" ? "thirty" : "fifteen"}
          />
        )}
      </div>
    </div>
  );
};

export default MainSchedule;
