import { useDispatch, useSelector } from "react-redux";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setAllTimeZone } from "../redux/features/timeZoneSlice";
import { Axios } from "../axios";

const Home = () => {
  const { thirtyMinute, fifteenMinute } = useSelector(
    (state) => state.meetingTime
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("/timezone")
      .then((res) => {
        dispatch(setAllTimeZone(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-5">
      <h1 className="fs-1 fw-bold">Dev Chand</h1>
      <p className="text mb-5">React | bootstrap css | redux-toolkit </p>
      <div className="meeting-card d-flex">
        <Link
          to="/30min"
          className="d-flex justify-content-center me-3 text-decoration-none"
        >
          <MeetingCard time={thirtyMinute} />
        </Link>
        <Link
          to="/15min"
          className="d-flex justify-content-center text-decoration-none"
        >
          <MeetingCard time={fifteenMinute} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
