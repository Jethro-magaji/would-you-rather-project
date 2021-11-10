export const GET_ALL_USERS = "GET_ALL_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export const GetUsers = (users) => {
  return { type: GET_ALL_USERS, users };
};

export const AddAnswerToUser = (users) => {
  return {
    type: ADD_ANSWER_TO_USER,
    users,
  };
};

export const AddQuestionToUser = (question) => {
  return {
    type: ADD_QUESTION_TO_USER,
    question,
  };
};
