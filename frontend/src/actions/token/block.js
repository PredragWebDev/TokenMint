import axios from 'axios';
import { getBlock } from '../../services/token'


export const FETCH_BLOCK_START = 'FETCH_BLOCK_START';
const fetchBlockStart = () => ({ type: FETCH_BLOCK_START });

export const FETCH_BLOCK_SUCCESS = 'FETCH_BLOCK_SUCCESS';
const fetchBlockSuccess = data => ({ type: FETCH_BLOCK_SUCCESS, data });

export const FETCH_BLOCK_FAILURE = 'FETCH_BLOCK_FAILURE';
const fetchBlockFailure = () => ({
  type: FETCH_BLOCK_FAILURE,
});

export const fetchBlock = (payload) => (dispatch) => {
  dispatch(fetchBlockStart());

  return getBlock(payload.blockNumber).
  			then(result => dispatch(fetchBlockSuccess(result)), error => dispatch(fetchBlockFailure));
};