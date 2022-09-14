import axios from 'axios';
import { API_URL } from '../../config';


export const METAMASK_FETCH_START = 'METAMASK_FETCH_START';
const metamaskFetchStart = () => ({ type: METAMASK_FETCH_START });

export const METAMASK_FETCH_SUCCESS = 'METAMASK_FETCH_SUCCESS';
const metamaskFetchSuccess = data => ({ type: METAMASK_FETCH_SUCCESS, data });

export const METAMASK_FETCH_FAILURE = 'METAMASK_FETCH_FAILURE';
const metamaskFetchFailure = () => ({
  type: METAMASK_FETCH_FAILURE,
});

export const metamaskFetch = (payload) => (dispatch) => {
  dispatch(metamaskFetchStart());
  const url = `${API_URL}api/user?publicAddress=`+payload.publicAddress;

  return axios.get(url)
    .then(success => dispatch(metamaskFetchSuccess(success.data)), error => dispatch(metamaskFetchFailure));
};
