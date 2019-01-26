import { SET_SPINNER } from "../actions/types";

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
