import axios from 'axios';
import { API_URL } from '../../config';


export const FETCH_ERC721_START = 'FETCH_ERC721_START';
const fetchErc721Start = () => ({ type: FETCH_ERC721_START });

export const FETCH_ERC721_SUCCESS = 'FETCH_ERC721_SUCCESS';
const fetchErc721Success = data => ({ type: FETCH_ERC721_SUCCESS, data });

export const fetchErc721 = () => (dispatch) => {
  dispatch(fetchErc721Start());
  const url = `${API_URL}api/erc721`;

  return axios.get(url)
    .then(success => dispatch(fetchErc721Success(success.data)));
};
