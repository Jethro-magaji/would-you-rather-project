import React from "react";
import { useSelector } from "react-redux";

const LeaderBoards = () => {
  const users = useSelector((state) => state.app.users);
  const userArray = Object.values(users);
  const processedUsers = [];
  userArray.forEach((user) => {
    const askedQuestions = user.questions.length;
    const answeredQuestions = Object.keys(user.answers).length;
    const totalQuestionsAndAnswers = askedQuestions + answeredQuestions;
    processedUsers.push({
      ...user,
      totalQuestionsAndAnswers,
      askedQuestions,
      answeredQuestions,
    });
  });
  const sortedUsers = processedUsers.sort((a, b) => {
    return b.totalQuestionsAndAnswers - a.totalQuestionsAndAnswers;
  });
  return (
    <>
      <div>
        <h2>LeaderBoards</h2>
        <div className="leaderboard">
          {sortedUsers.map((user, index) => {
            return (
              <div className="leaderboard__user card options-card" key={index}>
                <div className="leaderboard__user__name">
                  <img
                    src={user.avatarURL}
                    alt=""
                    className="leaderboard__user__image"
                  ></img>
                  <p>Name {user.name}</p>
                  <p>
                    Questions Asked {user.askedQuestions} || Questions Answered{" "}
                    {user.answeredQuestions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LeaderBoards;
