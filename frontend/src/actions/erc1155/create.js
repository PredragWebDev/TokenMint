import axios from 'axios';
import { API_URL } from '../../config';


export const CREATE_ERC1155_START = 'CREATE_ERC1155_START';
const createErc1155Start = () => ({ type: CREATE_ERC1155_START });

export const CREATE_ERC1155_SUCCESS = 'CREATE_ERC1155_SUCCESS';
const createErc1155Success = data => ({ type: CREATE_ERC1155_SUCCESS, data });

export const createErc1155 = (payload) => (dispatch) => {
  dispatch(createErc1155Start());
  const url = `${API_URL}api/erc1155`;

  return axios.post(url, payload)
    .then(success => dispatch(createErc1155Success(success.data)));
};
