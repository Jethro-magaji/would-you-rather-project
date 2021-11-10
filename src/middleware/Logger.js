export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Action ", action);
  const returnVal = next(action);
  console.log("current state", store.getState());
  console.groupEnd();
  return returnVal;
};
