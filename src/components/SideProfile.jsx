import { BiArrowBack } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Profile from "../assets/profile.webp";
import TimeZone from "./TimeZone";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCalendar } from "react-icons/ai";
import { setFormerDate } from "../redux/features/rescheduleSlice";
import "../assets/styles/SideProfile.scss";

const SideProfile = () => {
  const { detail } = useParams();

  const { id } = useParams();
  const location = window.location.href;

  const { time, day, month, yearNum, dayNum } = useSelector(
    (state) => state.details.yourDetail
  );
  const dispatch = useDispatch();
  const { newDate, formerDate } = useSelector((state) => state.reschedule);
  const { rescheduleData } = useSelector((state) => state.reschedule);
  if (!rescheduleData) {
    dispatch(setFormerDate({ time, day, month, yearNum, dayNum }));
  }

  return (
    <div
      className={`rounded-start w-50 relative border-end d-flex bg-brand flex-column align-items-center wrapper p-4`}
    >
      <div className="profile">
        <img src={Profile} className="profile-img" alt="promile" />
      </div>
      <p className="fw-bold pt-2 text-white">Dev Chand</p>
      <p className="pt-1 text-white py-1">
        {location === "http://localhost:3000/30min"
          ? id === "30min" && "30 Min Meeting"
          : id === "15min" && "15 Min Meeting"}
        {location === "http://localhost:3000/detailpage/30min"
          ? detail === "30min" && "30 Min Meeting"
          : detail === "15min" && "15 Min Meeting"}
        {/* {detail==undefined && detail === "30min" ? "30 Min Meeting" : "15 Min Meeting"} */}
      </p>
      <div className="w-80 mt-5">
        <div className="d-flex align-items-center py-1">
          <BsFillCameraVideoFill className="text-white" />
          <p className="ms-2 m-0 text-white">Call Video</p>
        </div>
        <div className="d-flex align-items-center py-1">
          <IoIosTime className="text-white" />
          <p className="ms-2 m-0 text-white">
            {location === "http://localhost:3000/30min"
              ? id === "30min" && "30 Min Meeting"
              : id === "15min" && "15 Min Meeting"}
            {location === "http://localhost:3000/detailpage/30min"
              ? detail === "30min" && "30 Min Meeting"
              : detail === "15min" && "15 Min Meeting"}
          </p>
        </div>
        {detail ? (
          rescheduleData ? (
            <div className="d-flex align-items-center py-1">
              <AiFillCalendar className="mr-4 text-white" />
              <div className="d-flex w-full text-warning">
                {time} , {newDate.day} ,{newDate.month},{newDate.dayNum},
                {newDate.yearNum}
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center py-1">
              <AiFillCalendar className="mr-4 text-white" />
              <div className="flex w-full text-base text-white">
                {time} , {day} ,{month},{dayNum},{yearNum}
              </div>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center">
            <FaGlobe className="text-white text-2xl " />
            <p className="text-white ms-2 m-0 ps-1">
              <TimeZone />
            </p>
          </div>
        )}
        {detail && rescheduleData && (
          <div className="mt-9 w-full">
            <p className="text-white ">Former Time</p>
            <div className="flex text-red-500 items-center ">
              <AiFillCalendar className="mr-4" />
              <div className="d-flex w-full line-through">
                {formerDate.time} , {formerDate.day} ,{formerDate.month},
                {formerDate.dayNum},{formerDate.yearNum}
              </div>
            </div>
          </div>
        )}
      </div>
      {!detail && (
        <div className="back-icon">
          <Link to="/">
            <BiArrowBack className="fs-4 top-2 left-2 absolute text-white text-2xl cursor-pointer hover:scale-125 hover:text-green-400 transition-all" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideProfile;
