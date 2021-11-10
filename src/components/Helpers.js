import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Question = (props) => {
  const users = useSelector((s) => s.Users);
  const [toQn, setToQn] = useState(null);
  const handleClick = (id) => {
    setToQn(id);
  };
  if (toQn) {
    return <Redirect to={{ pathname: "/questions/:" + toQn, id: toQn }} />;
  }

  return (
    <div className="row border border-dark">
      <p className="w-100 text-center text-primary bg-light">
        By {users[props.Question.author].name}
      </p>
      <div className="col-2 bg-light">
        <img
          src={`${users[props.Question.author].avatarURL}`}
          alt="use avater"
          className="w-100"
        />
      </div>
      <div className="col">
        Would you rather: <br />
        {props.Question.optionOne.text.split(" ")[0]}...
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => handleClick(props.Question.id)}
        >
          View poles
        </button>
      </div>
    </div>
  );
};
