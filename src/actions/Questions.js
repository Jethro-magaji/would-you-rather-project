import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import { AddAnswerToUser, AddQuestionToUser } from "./Users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const CREATE_NEW_QUESTION = "CREATE_NEW_QUESTION";

export const CreateQuestion = (question) => {
  return { type: CREATE_NEW_QUESTION, question };
};

export const ReceiveQuestions = (questions) => {
  return { type: RECEIVE_QUESTIONS, questions };
};

export const AnswerQuestion = (questions) => {
  return { type: ANSWER_QUESTION, questions };
};

export const HandleAnswer = (authedUser, qId, answer) => {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid: qId, answer }).then((res) => {
      dispatch(AnswerQuestion(res.questions));
      dispatch(AddAnswerToUser(res.users));
    });
  };
};

export const HandleCreateQuestion = (optionOne, optionTwo, authedUser) => {
  return (dispatch) => {
    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }).then((s) => {
      dispatch(CreateQuestion(s));
      dispatch(AddQuestionToUser(s));
    });
  };
};
