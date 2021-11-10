import React from "react";
import { Question } from "./Helpers";
import { useSelector } from "react-redux";

const UnansweredQuestions = () => {
  const questions = useSelector((s) => s.Questions);
  const AuthedUser = useSelector((s) => s.AuthedUser);

  return (
    <div>
      {Object.keys(questions)
        .reverse()
        .map((e) => {
          if (
            !questions[e].optionOne.votes
              .concat(questions[e].optionTwo.votes)
              .includes(AuthedUser)
          ) {
            return <Question key={e} Question={questions[e]} />;
          }
          return null;
        })}
    </div>
  );
};

export default UnansweredQuestions;
