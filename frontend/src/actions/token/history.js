import axios from 'axios';
import { getHistory } from '../../services/token'


export const FETCH_HISTORY_START = 'FETCH_HISTORY_START';
const fetchHistoryStart = () => ({ type: FETCH_HISTORY_START });

export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
const fetchHistorySuccess = data => ({ type: FETCH_HISTORY_SUCCESS, data });

export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';
const fetchHistoryFailure = () => ({
  type: FETCH_HISTORY_FAILURE,
});

export const fetchHistory = (payload) => (dispatch) => {
  dispatch(fetchHistoryStart());

  return getHistory(payload.tokenType).
  			then(result => dispatch(fetchHistorySuccess(result)), error => dispatch(fetchHistoryFailure));
};