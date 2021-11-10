import Users from "./Users";
import Questions from "./Questions";
import { combineReducers } from "redux";
import AuthedUser from "./AuthedUser";
import Heading from "./GetHeading";

export default combineReducers({ Users, Questions, AuthedUser, Heading });
