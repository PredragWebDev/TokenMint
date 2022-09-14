import axios from 'axios';
import { API_URL } from '../../config';


export const PUBLISH_PRODUCT_START = 'PUBLISH_PRODUCT_START';
const publishProductStart = () => ({ type: PUBLISH_PRODUCT_START });

export const PUBLISH_PRODUCT_SUCCESS = 'PUBLISH_PRODUCT_SUCCESS';
const publishProductSuccess = data => ({ type: PUBLISH_PRODUCT_SUCCESS, data });

export const PUBLISH_PRODUCT_FAILURE = 'PUBLISH_PRODUCT_FAILURE';
const publishProductFailure = () => ({
  type: PUBLISH_PRODUCT_FAILURE,
});

export const publishProduct = (payload) => (dispatch) => {
  dispatch(publishProductStart());
  const url = `${API_URL}api/opensea/${payload.id}`;

  return axios.post(url, {
  	type: payload.type,
  	address: payload.address,
  	quantity: payload.quantity
  })
    .then(success => dispatch(publishProductSuccess(success.data)), error => dispatch(publishProductFailure));
};
