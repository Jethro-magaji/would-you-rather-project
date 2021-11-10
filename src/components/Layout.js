import React from "react";
import { useSelector } from "react-redux";

const App = (props) => {
  const heading = useSelector((s) => s.Heading);
  return (
    <div className="w-50 border border-dark mx-auto vh-50">
      <div className="text-center bg-light text-secondary">
        <h5 className="p-2">{heading}</h5>
      </div>
      <div className="w-75 mx-auto p-2">{props.children}</div>
    </div>
  );
};

export default App;
