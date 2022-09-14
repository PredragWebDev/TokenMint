import axios from 'axios';
import { getTokenInfo } from '../../services/token'


export const FETCH_TOKEN_START = 'FETCH_TOKEN_START';
const fetchTokenStart = () => ({ type: FETCH_TOKEN_START });

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
const fetchTokenSuccess = data => ({ type: FETCH_TOKEN_SUCCESS, data });

export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
const fetchTokenFailure = () => ({
  type: FETCH_TOKEN_FAILURE,
});

export const fetchToken = (payload) => (dispatch) => {
  dispatch(fetchTokenStart());

  return getTokenInfo(payload.tokenId, payload.tokenType).
  			then(result => dispatch(fetchTokenSuccess(result)), error => dispatch(fetchTokenFailure));
};
