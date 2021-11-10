import { useSelector, useDispatch } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { HandleAnswer } from "../actions/Questions";
import { Redirect } from "react-router-dom";

const Question = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.Users);
  const questions = useSelector((s) => s.Questions);

  const AuthedUser = useSelector((s) => s.AuthedUser);
  const text =
    props.location.id === undefined
      ? null
      : `Question by ${users[questions[props.location.id].author].name}`;
  const votes =
    props.location.id === undefined
      ? null
      : questions[props.location.id].optionOne.votes.concat(
          questions[props.location.id].optionTwo.votes
        );
  const optionOne =
    props.location.id === undefined
      ? null
      : questions[props.location.id].optionOne;
  const optionTwo =
    props.location.id === undefined
      ? null
      : questions[props.location.id].optionTwo;
  const percentageOne =
    props.location.id === undefined
      ? null
      : +(
          Math.round((optionOne.votes.length / votes.length) * 100 + "e+2") +
          "e-2"
        );
  const percentageTwo =
    props.location.id === undefined
      ? null
      : +(
          Math.round((optionTwo.votes.length / votes.length) * 100 + "e+2") +
          "e-2"
        );

  const handleSubmit = (event) => {
    dispatch(HandleAnswer(AuthedUser, props.location.id, event.target.value));
  };
  if (props.location.id === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="row w-50 mx-auto border border-dark">
      <p className="w-100 text-center text-primary bg-light">{text}</p>
      <div className="col-4 bg-light">
        <img
          src={`${users[questions[props.location.id].author].avatarURL}`}
          alt="use avater"
          className="w-100"
        />
      </div>
      {votes.includes(AuthedUser) ? (
        <div className="col">
          Would you rather: <br />
          <div className="row border border-dark">
            <div className="row">
              <div className="col">
                {questions[props.location.id].optionOne.text}
              </div>
              <div className="col-4">
                {optionOne.votes.includes(AuthedUser) && (
                  <p className="align-middle  border border-dark rounded-circle text-center ">
                    Your Vote
                  </p>
                )}
              </div>
            </div>
            <ProgressBar now={percentageOne} label={`${percentageOne}%`} />
            <p>
              {optionOne.votes.length}/{votes.length}
            </p>
          </div>
          <p />
          <div className="row border border-dark mx-top">
            <div className="row">
              <div className="col">
                {questions[props.location.id].optionTwo.text}
              </div>
              <div className="col-4">
                {optionTwo.votes.includes(AuthedUser) && (
                  <p className="align-middle text-center  border border-dark rounded-circle">
                    Your Vote
                  </p>
                )}
              </div>
            </div>
            <ProgressBar now={percentageTwo} label={`${percentageTwo}%`} />
            <p>
              {optionTwo.votes.length}/{votes.length}
            </p>
          </div>
        </div>
      ) : (
        <div className="col">
          Would you rather: <br />
          <form>
            <div>
              <input
                type="radio"
                id="qn1"
                value="optionOne"
                name="qn"
                onClick={handleSubmit}
              />
              <label htmlFor="qn1">{optionOne.text}</label>
            </div>
            <div>
              <input
                type="radio"
                id="qn2"
                value="optionTwo"
                name="qn"
                onClick={handleSubmit}
              />
              <label htmlFor="qn2">{optionTwo.text}</label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Question;
