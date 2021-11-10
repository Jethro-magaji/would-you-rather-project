import { _getUsers, _getQuestions } from "../utils/_DATA";
import { GetUsers } from "./Users";
import { ReceiveQuestions } from "./Questions";
import { GetHeading } from "./Heading";

const InitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
};

const GetInitialData = () => {
  return (dispatch) => {
    const text = "Welcome to Would you Rather App, please sign in to continue";
    return InitialData().then(({ users, questions }) => {
      dispatch(GetUsers(users));
      dispatch(ReceiveQuestions(questions));
      dispatch(GetHeading(text));
    });
  };
};
export default GetInitialData;
