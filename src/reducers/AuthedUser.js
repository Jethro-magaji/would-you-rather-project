import { GET_AUTHED_USER, REMOVE_AUTHED_USER } from "../actions/AuthedUser";

const AuthedUser = (state = null, action) => {
  switch (action.type) {
    case GET_AUTHED_USER:
      return action.id;
    case REMOVE_AUTHED_USER:
      return null;
    default:
      return state;
  }
};

export default AuthedUser;
