import axios from "axios";
import {
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import setSpinner from "./spinner";

//Get the current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setSpinner(true));
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    })
    .finally(dispatch(setSpinner(false)));
};

//Create Profile
export const createProfile = (profileDate, history) => dispatch => {
  axios
    .post("/api/profile", profileDate)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS, 
        payload: err.response.data
      })
    );
}

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
  .post('/api/profile/education', eduData)
  .then(res => history.push('/'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS, 
      payload: err.response.data
    })
  );
}

// Delete Experience
export const deleteExperience = (id) => dispatch => {
  debugger;
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS, 
        payload: err.response.data
      })
    );
}

// Delete Education
export const deleteEducation = (id) => dispatch => {
  axios
  .delete(`/api/profile/education/${id}`)
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })  
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS, 
      payload: err.response.data
    })
  );
}

//Delete Profile and Account
export const deleteAccount = history => dispatch => {
  dispatch(setSpinner(true));
  axios
    .delete("/api/profile")
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
    .finally(dispatch(setSpinner(false)));
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
