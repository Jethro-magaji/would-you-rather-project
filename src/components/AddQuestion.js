import React from "react";
import { useState } from "react";
import { HandleCreateQuestion } from "../actions/Questions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const App = () => {
  const [optionOne, setOptionOne] = useState(null);
  const [optionTwo, setOptionTwo] = useState(null);
  const handleOptionOne = (event) => {
    setOptionOne(event.target.value);
  };
  const authedUser = useSelector((s) => s.AuthedUser);
  const [qnAdded, setQnAdded] = useState(false);
  const dispatch = useDispatch();
  const handleOptionTwo = (event) => {
    setOptionTwo(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(HandleCreateQuestion(optionOne, optionTwo, authedUser));
    setQnAdded(true);
  };
  if (qnAdded) {
    return <Redirect to="/" exact />;
  }
  return (
    <div className="w-50 border border-dark mx-auto vh-50">
      <div className="text-center bg-light text-secondary">
        <h5 className="p-2">Create new question</h5>
      </div>
      <div>
        <form className="w-75 mx-auto p-2" onSubmit={handleSubmit}>
          <label htmlFor="qn" className="form-label">
            Would your rather...{" "}
          </label>
          <input
            id="qn"
            className="form-control"
            type="text"
            placeholder="Enter option one text here"
            onChange={handleOptionOne}
          />
          <p className="text-center">or</p>
          <input
            id="qn"
            className="form-control"
            type="text"
            placeholder="Enter option t text here"
            onChange={handleOptionTwo}
          />
          <p />
          <input
            type="submit"
            value="Submit"
            className=" form-control btn btn-sm btn-outline-primary p-2"
          />
        </form>
      </div>
    </div>
  );
};

export default App;
