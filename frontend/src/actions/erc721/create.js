import axios from 'axios';
import { API_URL } from '../../config';


export const CREATE_ERC721_START = 'CREATE_ERC721_START';
const createErc721Start = () => ({ type: CREATE_ERC721_START });

export const CREATE_ERC721_SUCCESS = 'CREATE_ERC721_SUCCESS';
const createErc721Success = data => ({ type: CREATE_ERC721_SUCCESS, data });

export const createErc721 = (payload) => (dispatch) => {
  dispatch(createErc721Start());
  const url = `${API_URL}api/erc721`;

  return axios.post(url, payload)
    .then(success => dispatch(createErc721Success(success.data)));
};
