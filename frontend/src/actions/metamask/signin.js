import axios from 'axios';
import { API_URL } from '../../config';


export const METAMASK_LOGIN_START = 'METAMASK_LOGIN_START';
const metamaskLoginStart = () => ({ type: METAMASK_LOGIN_START });

export const METAMASK_LOGIN_SUCCESS = 'METAMASK_LOGIN_SUCCESS';
const metamaskLoginSuccess = data => ({ type: METAMASK_LOGIN_SUCCESS, data });

export const METAMASK_LOGIN_FAILURE = 'METAMASK_LOGIN_FAILURE';
const metamaskLoginFailure = error => ({
  type: METAMASK_LOGIN_FAILURE,
  error,
});

export const metamaskLogin = (payload) => (dispatch) => {
  dispatch(metamaskLoginStart());
  const url = `${API_URL}auth`;

  return axios.post(url, payload)
    .then(success => dispatch(metamaskLoginSuccess(success.data)), 
    	(error) => {
          let errorMessage = 'login failed';
          if (error.response && error.response.data.error)
            errorMessage = error.response.data.error;

          return dispatch(metamaskLoginFailure(errorMessage));
        });
};
