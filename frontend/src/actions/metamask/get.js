import axios from 'axios';
import { API_URL } from '../../config';


export const METAMASK_GET_START = 'METAMASK_GET_START';
const metamaskGetStart = () => ({ type: METAMASK_GET_START });

export const METAMASK_GET_SUCCESS = 'METAMASK_GET_SUCCESS';
const metamaskGetSuccess = data => ({ type: METAMASK_GET_SUCCESS, data });

export const METAMASK_GET_FAILURE = 'METAMASK_GET_FAILURE';
const metamaskGetFailure = () => ({
  type: METAMASK_GET_FAILURE,
});

export const metamaskGet = (payload) => (dispatch) => {
  dispatch(metamaskGetStart());
  const url = `${API_URL}api/user?userId=`+payload.userId;

  return axios.get(url)
    .then(success => dispatch(metamaskGetSuccess(success.data)), error => dispatch(metamaskGetFailure));
};
