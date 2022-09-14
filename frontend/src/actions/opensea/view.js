import axios from 'axios';
import { API_URL } from '../../config';


export const VIEW_PRODUCT_START = 'VIEW_PRODUCT_START';
const viewProductStart = () => ({ type: VIEW_PRODUCT_START });

export const VIEW_PRODUCT_SUCCESS = 'VIEW_PRODUCT_SUCCESS';
const viewProductSuccess = data => ({ type: VIEW_PRODUCT_SUCCESS, data });

export const VIEW_PRODUCT_FAILURE = 'VIEW_PRODUCT_FAILURE';
const viewProductFailure = () => ({
  type: VIEW_PRODUCT_FAILURE,
});

export const viewProduct = (payload) => (dispatch) => {
  dispatch(viewProductStart());
  const url = `${API_URL}api/opensea/${payload.id}?type=${payload.type}&address=${payload.address}`;

  return axios.get(url)
    .then(success => dispatch(viewProductSuccess(success.data)), error => dispatch(viewProductFailure));
};
