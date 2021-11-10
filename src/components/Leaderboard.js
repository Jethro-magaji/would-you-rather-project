import { useSelector } from "react-redux";

const App = () => {
  const users = useSelector((s) => s.Users);
  return (
    <div className="w-50 border border-dark mx-auto vh-50">
      <div className="row">
        {Object.keys(users)
          .map((y) => {
            const questionsAnswered = Object.keys(users[y].answers).length;
            const questionsAsked = users[y].questions.length;
            const votes = questionsAnswered + questionsAsked;
            return {
              user: y,
              asked: questionsAsked,
              answered: questionsAnswered,
              votes,
            };
          })
          .sort(function compareSecondColumn(a, b) {
            if (a.votes === b.votes) {
              return 0;
            } else {
              return a.votes > b.votes ? -1 : 1;
            }
          })
          .map((s) => {
            return (
              <div
                key={s.user}
                style={{ width: "90%" }}
                className=" p-2 mx-auto"
              >
                <div className="border border-dark row">
                  <p className="w-100 text-center text-primary bg-light">
                    {users[s.user].name}
                  </p>
                  <div className="col-2">
                    <img
                      src={`${users[s.user].avatarURL}`}
                      alt="use avater"
                      className="w-100"
                    />
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <p>Answered Questions {s.answered}</p>
                        <p>Asked Questions {s.asked}</p>
                      </div>
                      <div className="col-2 border border-success">
                        <p className="row bg-success h-50 text-center">Score</p>
                        <p className="row ">{s.votes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
