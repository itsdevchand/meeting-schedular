import React, { useState } from "react";
import { BsFillPersonPlusFill, BsPersonDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setUserInput } from "../redux/features/detailsSlice";

const FormInput = () => {
  const { detail } = useParams();
  const { timeZone } = useSelector((state) => state.timeZone.selectedTimeZone);
  const timeFormat = detail === "30min" ? 30 : 15;
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    userName: "",
    userEmail: "",
    guestEmail: "",
    additionalNote: "",
  });
  const inputUser = useSelector((state) => state.details);
  const inputName = (event) => {
    return setInput((prevState) => {
      return { ...prevState, userName: event.target.value };
    });
  };

  const inputUserEmail = (event) => {
    return setInput((prevState) => {
      return { ...prevState, userEmail: event.target.value };
    });
  };
  const inputGuestEmail = (event) => {
    return setInput((prevState) => {
      return { ...prevState, guestEmail: event.target.value };
    });
  };
  const inputAdditionalNote = (event) => {
    return setInput((prevState) => {
      return { ...prevState, additionalNote: event.target.value };
    });
  };
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      setUserInput({
        userName: input.userName,
        userEmail: input.userEmail,
        guestEmail: input.guestEmail,
        additionalNote: input.additionalNote,
        timeFormat: timeFormat,
        timezone: timeZone,
      })
    );
    navigate("/confirmationpage");
  };

  return (
    <div className="w-50 p-4 rounded-end">
      <form className="d-flex flex-column" onSubmit={submitHandler}>
        <div className="mb-2">
          <label className="form-label">Full Name</label>
          <input
            required
            onChange={inputName}
            placeholder="John Doe"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Email address</label>
          <input
            required
            onChange={inputUserEmail}
            placeholder="someone@example.com"
            type="email"
            className="form-control"
          />
        </div>
        {toggle && (
          <div className="mb-2">
            <label className="form-label">Guests</label>
            <input
              onChange={inputGuestEmail}
              placeholder="someone@gmail.com"
              type="email"
              className="form-control"
            />
          </div>
        )}
        <div className="mb-2">
          <label className="form-label">Additional Note</label>
          <textarea
            rows={6}
            onChange={inputAdditionalNote}
            placeholder="Please provide me with details for our upcoming meeting..."
            type="textarea"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-between align-items-center mt-4">
          {toggle ? (
            <BsPersonDashFill
              onClick={() => setToggle(false)}
              className="text-white  ml-2"
            />
          ) : (
            <BsFillPersonPlusFill
              onClick={() => setToggle(true)}
              className="fs-3 cursor-pointer"
            />
          )}
          <div className="d-flex align-items-center">
            <Link to="/" className="btn btn-danger px-4 me-3">
              cancel
            </Link>
            <button type="submit" className="btn bg-brand text-white px-4">
              Schedule
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInput;
