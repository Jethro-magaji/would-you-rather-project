import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveQuestion, getAllUsers } from "../store/reducers";

const CreatePoll = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.app.loggedInUser.name);
  const [question, setQuestion] = useState({});

  const handleOptionOneInputChange = (e) => {
    const { value } = e.target;
    setOptionOne(value);
  };

  const handleOptionTwoInputChange = (e) => {
    const { value } = e.target;
    setOptionTwo(value);
  };
  useEffect(() => {
    if (question.optionOneText && question.optionTwoText) {
      dispatch(saveQuestion(question));
      dispatch(getAllUsers());
      setRedirect(true);
    }
  }, [dispatch, question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputQuestion = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: loggedInUser,
    };
    setQuestion(inputQuestion);
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>
        <p>Would you Rather (Enter both Options) </p>
        <form className="input-form" onSubmit={handleSubmit}>
          <span className="input-container">
            <label htmlFor="optionOne">Option one:</label>
            <input
              type="text"
              id="optionOne"
              onChange={handleOptionOneInputChange}
            ></input>
          </span>
          <span className="input-container">
            <label htmlFor="optionTwo">Option Two:</label>
            <input
              type="text"
              id="optionTwo"
              onChange={handleOptionTwoInputChange}
            ></input>
          </span>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreatePoll;
