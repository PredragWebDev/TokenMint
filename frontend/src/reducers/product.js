import { FETCH_PRODUCT_START, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE } from '../actions/product/fetch'

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
    case FETCH_PRODUCT_START:
		  	return { ...state, isLoading: true, data:[] };
    case FETCH_PRODUCT_SUCCESS:
    	  return { ...state, isLoading: false, error: null, data: action.data }
    case FETCH_PRODUCT_FAILURE:
        return { ...state, isLoading: true, data: [] };
    default:
      	return state;
	}
};