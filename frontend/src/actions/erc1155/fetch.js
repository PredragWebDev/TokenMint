import axios from 'axios';
import { API_URL } from '../../config';


export const FETCH_ERC1155_START = 'FETCH_ERC1155_START';
const fetchErc1155Start = () => ({ type: FETCH_ERC1155_START });

export const FETCH_ERC1155_SUCCESS = 'FETCH_ERC1155_SUCCESS';
const fetchErc1155Success = data => ({ type: FETCH_ERC1155_SUCCESS, data });

export const fetchErc1155 = () => (dispatch) => {
  dispatch(fetchErc1155Start());
  const url = `${API_URL}api/erc1155`;

  return axios.get(url)
    .then(success => dispatch(fetchErc1155Success(success.data)));
};
