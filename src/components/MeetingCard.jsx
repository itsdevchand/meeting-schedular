import { AiOutlineArrowRight, AiFillClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const MeetingCard = ({ time }) => {
  return (
    <div className="d-flex align-items-center justify-content-between p-5 bg-brand cursor-pointer rounded">
      <p className="text-white p-3 fs-4 m-0">{time} min meeting</p>
      <div className="d-flex">
        <div className="border rounded d-flex justify-content-center align-items-center p-3 me-3">
          <AiFillClockCircle className="text-white fs-3" />
          <p className="text-white ms-3 fs-3 m-0">{time}</p>
        </div>
        <div className="border rounded d-flex justify-content-center align-items-center p-3">
          <p className="text-white m-0 text-nowrap">1 -</p>
          <BsFillPersonFill className="text-white" />
          <p className="text-white text-nowrap m-0">- 1</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
