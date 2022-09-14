import axios from 'axios';
import { API_URL } from '../../config';


export const CREATE_PRODUCT_START = 'CREATE_PRODUCT_START';
const createProductStart = () => ({ type: CREATE_PRODUCT_START });

export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
const createProductSuccess = data => ({ type: CREATE_PRODUCT_SUCCESS, data });

export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
const createProductFailure = () => ({
  type: CREATE_PRODUCT_FAILURE,
});

export const createProduct = (payload) => (dispatch) => {
  dispatch(createProductStart());
  const url = `${API_URL}api/product`;

  return axios.post(url, payload)
    .then(success => dispatch(createProductSuccess(success.data)), error => dispatch(createProductFailure));
};
