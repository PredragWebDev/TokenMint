import axios from 'axios';
import { API_URL } from '../../config';


export const METAMASK_SIGNUP_START = 'METAMASK_SIGNUP_START';
const metamaskSignupStart = () => ({ type: METAMASK_SIGNUP_START });

export const METAMASK_SIGNUP_SUCCESS = 'METAMASK_SIGNUP_SUCCESS';
const metamaskSignupSuccess = data => ({ type: METAMASK_SIGNUP_SUCCESS, data });

export const METAMASK_SIGNUP_FAILURE = 'METAMASK_SIGNUP_FAILURE';
const metamaskSignupFailure = () => ({
  type: METAMASK_SIGNUP_FAILURE,
});

export const metamaskSignup = (payload) => (dispatch) => {
  dispatch(metamaskSignupStart());
  const url = `${API_URL}api/user`;

  return axios.post(url, payload)
    .then(success => dispatch(metamaskSignupSuccess(success.data)), error => dispatch(metamaskSignupFailure));
};
