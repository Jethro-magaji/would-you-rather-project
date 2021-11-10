import React from "react";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { GetHeading } from "../actions/Heading";
import { useDispatch } from "react-redux";
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";

const Home = () => {
  const [answered, setAnswered] = useState(false);
  const text = "Questions";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetHeading(text));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <table>
        <thead>
          <tr className="w-100">
            <th className="w-100">
              <button
                className="btn btn-outline-primary"
                onClick={() => setAnswered(false)}
              >
                Unanswered
              </button>
            </th>
            <th className="w-100">
              <button
                className="btn btn-outline-success"
                onClick={() => setAnswered(true)}
              >
                Answered
              </button>
            </th>
          </tr>
        </thead>
      </table>
      <div>{answered ? <AnsweredQuestions /> : <UnansweredQuestions />}</div>
    </Layout>
  );
};
export default Home;
