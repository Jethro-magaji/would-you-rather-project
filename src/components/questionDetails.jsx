import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  saveQuestionAnswer,
  getQuestions,
  getAllUsers,
} from "../store/reducers";

const computePercentage = (votes, totalVotes) => {
  if (votes === 0) {
    return 0;
  }
  return Math.round((votes / totalVotes) * 100);
};
export const QuestionDetails = (props) => {
  const dispatch = useDispatch();
  const questionId = props.match.params.id;
  const questions = useSelector((state) => state.app.questions);
  const authorDetails = useSelector((state) => state.app.users);
  const loggedInUser = useSelector((state) => state.app.loggedInUser.name);
  const [questionAnswer, setQuestionAnswer] = useState({});
  const [optionOneCheckBox, setOptionOneCheckBox] = useState(false);
  const [optionTwoCheckBox, setOptionTwoCheckBox] = useState(false);
  let selectedUserOption = "";
  const selectedQuestion = questions && questions[questionId];
  const pollAuthor = selectedQuestion?.author;
  const authorDetail = authorDetails && authorDetails[pollAuthor];
  const optionOneVotes = selectedQuestion?.optionOne?.votes.length;
  const optionTwoVotes = selectedQuestion?.optionTwo?.votes.length;
  const selectedOptionOnePollText = selectedQuestion?.optionOne?.text;
  const selectedOptionTwoPollText = selectedQuestion?.optionTwo?.text;

  useEffect(() => {
    if (questionAnswer.hasOwnProperty("qid")) {
      dispatch(saveQuestionAnswer(questionAnswer));
      dispatch(getQuestions(questionAnswer));
      dispatch(getAllUsers());
    }
  }, [dispatch, questionAnswer]);

  if (selectedQuestion?.optionOne?.votes.includes(loggedInUser)) {
    selectedUserOption = "optionOne";
  }
  if (selectedQuestion?.optionTwo?.votes.includes(loggedInUser)) {
    selectedUserOption = "optionTwo";
  }
  let selectedQuestionCopy = {};

  const selectedInput = (e) => {
    const selectedOption = e.target.value;
    const checked = e.target.checked;

    if (selectedOption === "optionOne" && checked) {
      setOptionOneCheckBox(checked);
      setOptionTwoCheckBox(false);
    }
    if (selectedOption === "optionTwo" && checked) {
      setOptionTwoCheckBox(checked);
      setOptionOneCheckBox(false);
    }
    selectedQuestionCopy = {
      answer: selectedOption,
      authedUser: loggedInUser,
      qid: questionId,
    };
    selectedUserOption = "";
    setQuestionAnswer(selectedQuestionCopy);
  };
  const optionOneVoters = JSON.stringify(selectedQuestion?.optionOne.votes);
  const optionTwoVoters = JSON.stringify(selectedQuestion?.optionTwo.votes);

  if (!selectedQuestion) {
    return <Redirect to="/404" />;
  }

  return (
    <div>
      <h3>Welcome to the Poll {questionId}</h3>
      <div key={selectedQuestion?.id} className="card options-card">
        <p>Would you Rather</p>
        <img
          src={authorDetail?.avatarURL}
          alt="author images"
          className="author-image"
        ></img>
        <div className="options-holder">
          <div className="option-text">
            <p>
              {selectedOptionOnePollText} || {selectedOptionTwoPollText}
            </p>
            <p>
              {optionOneVotes}/3 votes || {optionTwoVotes}/3 votes
            </p>
            <p>
              {computePercentage(optionOneVotes, 3)}% ||{" "}
              {computePercentage(optionTwoVotes, 3)} %
            </p>
            <form className="input-form select-option-form">
              <span>
                <label htmlFor="optionOne">OptionOne:</label>
                <input
                  type="checkbox"
                  id="optionOne"
                  value="optionOne"
                  checked={
                    optionOneCheckBox || selectedUserOption === "optionOne"
                      ? "checked"
                      : ""
                  }
                  onChange={selectedInput}
                ></input>
              </span>{" "}
              ||
              <span>
                <label htmlFor="optionTwo">OptionTwo:</label>
                <input
                  type="checkbox"
                  id="optionTwo"
                  value="optionTwo"
                  checked={
                    optionTwoCheckBox || selectedUserOption === "optionTwo"
                      ? "checked"
                      : ""
                  }
                  onChange={selectedInput}
                ></input>
              </span>
            </form>

            <p>
              Option voters: {optionOneVoters} || {optionTwoVoters}
            </p>
          </div>
          <p>Written by {pollAuthor}</p>
        </div>
      </div>
    </div>
  );
};

QuestionDetails.propTypes = {
  props: PropTypes.object,
};

export default QuestionDetails;
