import axios from 'axios';
import { getTransaction } from '../../services/token'


export const FETCH_TRANASCTION_START = 'FETCH_TRANASCTION_START';
const fetchTransactionStart = () => ({ type: FETCH_TRANASCTION_START });

export const FETCH_TRANSACTION_SUCCESS = 'FETCH_TRANSACTION_SUCCESS';
const fetchTransactionSuccess = data => ({ type: FETCH_TRANSACTION_SUCCESS, data });

export const FETCH_TRANSACTION_FAILURE = 'FETCH_TRANSACTION_FAILURE';
const fetchTransactionFailure = () => ({
  type: FETCH_TRANSACTION_FAILURE,
});

export const fetchTransaction = (payload) => (dispatch) => {
  dispatch(fetchTransactionStart());

  return getTransaction(payload.hash).
  			then(result => dispatch(fetchTransactionSuccess(result)), error => dispatch(fetchTransactionFailure));
};