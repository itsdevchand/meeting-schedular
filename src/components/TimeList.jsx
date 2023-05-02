import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDetails } from "../redux/features/detailsSlice";

const TimeList = ({ twelveHour, twentyFourHour, time }) => {
  const {
    selectedDate,
    selectedDay,
    selectedMonth,
    selectedDayNum,
    selectedYearNum,
    hours,
  } = useSelector((state) => state.timeZone);
  const [toggleHr, setToggleHr] = useState(true);
  const currentDate = new Date();
  const [newArray, setNewArray] = useState(null);
  const [twelveFormatArray, setTwelveFormatArray] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(
      setDetails({
        time: item,
        day: selectedDay,
        month: selectedMonth,
        yearNum: selectedYearNum,
        dayNum: selectedDayNum,
      })
    );
    time === "thirty" && navigate("/detailpage/30min");
    time === "fifteen" && navigate("/detailpage/15min");
  };

  useEffect(() => {
    const date = new Date(selectedDate);
    const val = date.getDay();
    const month = date.getMonth();

    if (
      selectedDate !== "" &&
      currentDate.getDay() === val &&
      currentDate.getMonth() === month
    ) {
      setNewArray(
        twentyFourHour.filter((item) => {
          return parseInt(item) > hours + 1;
        })
      );
    } else {
      setNewArray(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (newArray) {
      setTwelveFormatArray(
        newArray.map((item, index) => {
          return twelveHour[index];
        })
      );
    } else {
      setTwelveFormatArray(null);
    }
  }, [newArray]);
  return (
    <div
      className="w-50 d-flex flex-column p-5 bg-brand rounded-end"
      style={{ height: "600px" }}
    >
      <div className=" d-flex justify-content-between align-items-center">
        <p className="text-white">
          {selectedDay}, {selectedMonth} {selectedDayNum}
        </p>
        <div className="d-flex border border-1 px-2 py-1 rounded">
          <button
            className={`py-2 px-4 me-4 rounded btn ${
              toggleHr ? "bg-white" : "text-white"
            }`}
            onClick={() => {
              setToggleHr(true);
            }}
          >
            12h
          </button>
          <button
            className={`py-2 px-4 rounded btn ${
              !toggleHr ? "bg-white text-black" : "text-white"
            }`}
            onClick={() => {
              setToggleHr(false);
            }}
          >
            24h
          </button>
        </div>
      </div>
      <div style={{ overflowY: "scroll", height: "100%" }} className="mt-5">
        {newArray === null &&
          (toggleHr ? twelveHour : twentyFourHour).map((item, id) => {
            return (
              <div
                onClick={() => handleClick(item)}
                key={id}
                className="mt-3 border border-1 cursor-pointer d-flex justify-content-center border border-white p-2 rounded"
              >
                <p className="text-white text-xl">{item}</p>
              </div>
            );
          })}
        {time === "thirty" && toggleHr
          ? newArray !== null &&
            newArray.map((item, id) => {
              return (
                <div
                  onClick={() => handleClick(item)}
                  key={id}
                  className="mt-3 cursor-pointer w-[98%] h-9 border-2 border-white rounded-lg flex justify-center items-center transition-all hover:scale-[1.008] hover:bg-[#041c32]"
                >
                  <p className="text-white text-xl">{item}</p>
                </div>
              );
            })
          : twelveFormatArray !== null &&
            twelveFormatArray.map((item, id) => {
              return (
                <div
                  onClick={() => handleClick(item)}
                  key={id}
                  className="mt-3 cursor-pointer w-[98%] h-9 border-2 border-white rounded-lg flex justify-center items-center transition-all hover:scale-[1.008] hover:bg-[#041c32]"
                >
                  <p className="text-white text-xl">{item}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TimeList;
