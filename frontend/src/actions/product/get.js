import axios from 'axios';
import { API_URL } from '../../config';


export const GET_PRODUCT_START = 'GET_PRODUCT_START';
const getProductStart = () => ({ type: GET_PRODUCT_START });

export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const getProductSuccess = data => ({ type: GET_PRODUCT_SUCCESS, data });

export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';
const getProductFailure = () => ({
  type: GET_PRODUCT_FAILURE,
});

export const getProduct = (payload) => (dispatch) => {
  dispatch(getProductStart());
  const url = `${API_URL}api/product/${payload.productId}`;

  return axios.get(url)
    .then(success => dispatch(getProductSuccess(success.data)), error => dispatch(getProductFailure));
};
