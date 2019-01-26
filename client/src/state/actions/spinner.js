import { SET_SPINNER } from "./types";
const setSpinner = value => {
  return {
    type: SET_SPINNER,
    payload: value
  };
};
export default setSpinner;
