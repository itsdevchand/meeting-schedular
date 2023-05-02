import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setRescheduleFalse } from "../redux/features/rescheduleSlice";

const CancelPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="container" style={{ maxWidth: "992px" }}>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          marginTop: "180px",
        }}
        className={`p-5 bg-white`}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <MdCancel style={{ fontSize: "50px" }} className="text-danger" />
          <p className="mt-4 fw-bold fs-3">Your meeting has been Cancelled</p>
          <p className="mb-1 mt-3">
            You can
            <Link
              to="/"
              onClick={() => dispatch(setRescheduleFalse())}
              className="border-bottom border-primary mx-2"
            >
              schedule your meeting again.
            </Link>{" "}
          </p>
          <p>Thank you!</p>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
