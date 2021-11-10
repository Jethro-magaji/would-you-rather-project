import {
  GET_ALL_USERS,
  ADD_ANSWER_TO_USER,
  ADD_QUESTION_TO_USER,
} from "../actions/Users";

export default function Users(state = {}, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, ...action.users };
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [
            ...state[action.question.author].questions,
            action["question"]["id"],
          ],
        },
      };
    default:
      return { ...state };
  }
}
