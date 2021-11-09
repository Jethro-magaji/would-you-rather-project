import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../data";

const initialState = {
  answerDetails: { answer: false, details: {} },
  users: [],
  loggedInUser: {
    name: "",
    loggedIn: false,
  },
  questions: [],
};

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _getUsers();
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _getQuestions();
      const data = response;
      return { data, user: payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _saveQuestion(payload);
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const saveQuestionAnswer = createAsyncThunk(
  "questions/saveQuestionAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _saveQuestionAnswer(payload);
      const data = response;
      return { data, payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const wouldRatherSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.data;
      const { user } = action.payload;
      if (user) {
        state.answerDetails = {
          answer: true,
          details: user,
        };
      }

      if (Object.keys(state.answerDetails.details).length > 0) {
        state.answerDetails = { answer: true, details: user };
        const { answer, qid, authedUser } = user;
        const question = { ...state.questions[qid] };
        let updatedQuestion = {};
        //prevents having duplicate answers
        if (answer === "optionOne") {
          const optionOneVotes = [...new Set(question.optionOne.votes)];
          const optionTwoVotes = [...new Set(question.optionTwo.votes)].filter(
            (user) => user !== authedUser
          );
          updatedQuestion = {
            ...question,
            optionOne: {
              ...question.optionOne,
              votes: optionOneVotes,
            },
            optionTwo: {
              ...question.optionTwo,
              votes: optionTwoVotes,
            },
          };
        } else {
          const optionTwoVotes = [...new Set(question.optionTwo.votes)];
          const optionOneVotes = [...new Set(question.optionOne.votes)].filter(
            (user) => user !== authedUser
          );
          updatedQuestion = {
            ...question,
            optionOne: {
              ...question.optionOne,
              votes: optionOneVotes,
            },
            optionTwo: {
              ...question.optionTwo,
              votes: optionTwoVotes,
            },
          };
        }
        state.questions = { ...state.questions, [qid]: updatedQuestion };
      }
    });
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      const savedQuestion = action.payload;
      const id = savedQuestion.id;
      state.questions = { ...state.questions, [id]: savedQuestion };
    });
    builder.addCase(saveQuestionAnswer.fulfilled, (state, action) => {});
    builder.addCase("LOGIN", (state, action) => {
      state.loggedInUser.name = action.payload;
      state.loggedInUser.loggedIn = true;
    });
    builder.addCase("LOGOUT", (state, action) => {
      state.loggedInUser.name = "";
      state.loggedInUser.loggedIn = false;
    });
  },
});

export default wouldRatherSlice.reducer;
