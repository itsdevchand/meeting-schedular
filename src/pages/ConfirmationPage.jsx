import { AiOutlineFileDone } from "react-icons/ai";
import { CgChevronDoubleRight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setRescheduleFalse,
  setRescheduleTrue,
} from "../redux/features/rescheduleSlice";

const ConfirmationPage = () => {
  const {
    timeFormat,
    userName,
    userEmail,
    guestEmail,
    additionalNote,
    timezone,
  } = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { time, day, month, yearNum, dayNum } = useSelector(
    (state) => state.details.yourDetail
  );
  console.log(timeFormat);
  const resetHandler = () => {
    dispatch(setRescheduleTrue());
  };
  return (
    <div className="container">
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          marginTop: "180px",
        }}
        className="d-flex flex-column align-items-center justify-content-center bg-white rounded-3"
      >
        <div className="d-flex flex-column justify-content-center align-items-center w-100 border-bottom border-1 py-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <AiOutlineFileDone className="text-6xl text-green-600" />
            <p className="mt-4 font-bold text-lg">Your meeting Scheduled</p>
            <p className="text-warning">
              You can get email of this meeting in details
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center border-bottom border-1 w-100">
          <div className="d-flex flex-column items-start p-3  ">
            <div className="d-flex align-items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                Meeting Time
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3">{timeFormat} min meeting</p>
            </div>
            <div className="flex items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                When
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3">
                {dayNum},{day},{month}, {yearNum} | {time} | {timezone}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                Who
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3">
                Dev Chand - Organizer itsdevchand@gmail.com
              </p>
            </div>
            <div className="flex items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                Participants
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3">
                {userEmail} {guestEmail && "Guest" - guestEmail}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                Where
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3">Video Call</p>
            </div>
            <div className="flex items-center">
              <p
                className="py-2 pe-3"
                style={{ textAlign: "right", minWidth: "200px" }}
              >
                Additional Notes
              </p>
              <CgChevronDoubleRight className="" />
              <p className="ps-3 w-[340px]  overflow-x-hidden flex flex-wrap">
                {additionalNote}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-center p-3">
          <p className=" text-lg flex ">
            <Link
              onClick={resetHandler}
              to={"/" + timeFormat + "min"}
              className="btn btn-primary px-3 "
            >
              Reschedule
            </Link>
            <span className="mx-5">OR</span>
            <div>
              <Link
                to="/cancelpage"
                onClick={() => dispatch(setRescheduleFalse())}
                className="btn btn-danger px-3"
              >
                Cancel
              </Link>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

// 2:30 PM , Thursday ,May,25,2023
