export const GET_AUTHED_USER = "GET_AUTHED_USER";
export const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER";

const GetAuthedUser = (id) => {
  return { type: GET_AUTHED_USER, id };
};

export const RemoveAuthedUser = () => {
  return {
    type: REMOVE_AUTHED_USER,
  };
};
export default GetAuthedUser;
