import { GET_HEADING } from "../actions/Heading";

const GetHeading = (state = null, action) => {
  switch (action.type) {
    case GET_HEADING:
      return action.text;
    default:
      return state;
  }
};

export default GetHeading;
