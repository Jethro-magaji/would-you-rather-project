import {
  CREATE_NEW_QUESTION,
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
} from "../actions/Questions";

export const Questions = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_QUESTION:
      console.log(action);
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        ...action.questions,
      };
    default:
      return state;
  }
};

export default Questions;
