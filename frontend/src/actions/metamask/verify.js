import axios from 'axios';
import { API_URL } from '../../config';


export const METAMASK_VERIFY_START = 'METAMASK_VERIFY_START';
const metamaskVerifyStart = () => ({ type: METAMASK_VERIFY_START });

export const METAMASK_VERIFY_SUCCESS = 'METAMASK_VERIFY_SUCCESS';
const metamaskVerifySuccess = data => ({ type: METAMASK_VERIFY_SUCCESS, data });

export const METAMASK_VERIFY_FAILURE = 'METAMASK_VERIFY_FAILURE';
const metamaskVerifyFailure = () => ({
  type: METAMASK_VERIFY_FAILURE,
});

export const metamaskVerify = (payload) => (dispatch) => {
  dispatch(metamaskVerifyStart());
  const url = `${API_URL}api/user/verify`

  return axios.post(url, payload)
    .then(success => dispatch(metamaskVerifySuccess(success.data)), error => dispatch(metamaskVerifyFailure));
};
