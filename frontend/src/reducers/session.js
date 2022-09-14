import { METAMASK_FETCH_START, METAMASK_FETCH_SUCCESS, METAMASK_FETCH_FAILURE } from '../actions/metamask/fetch'
import { METAMASK_LOGIN_START, METAMASK_LOGIN_SUCCESS, METAMASK_LOGIN_FAILURE } from '../actions/metamask/signin'
import { METAMASK_SIGNUP_START, METAMASK_SIGNUP_SUCCESS, METAMASK_SIGNUP_FAILURE } from '../actions/metamask/signup'
import { METAMASK_GET_START, METAMASK_GET_SUCCESS, METAMASK_GET_FAILURE } from '../actions/metamask/get'
import { PUBLISH_PRODUCT_START, PUBLISH_PRODUCT_SUCCESS, PUBLISH_PRODUCT_FAILURE } from '../actions/opensea/publish'
import { VIEW_PRODUCT_START, VIEW_PRODUCT_SUCCESS, VIEW_PRODUCT_FAILURE } from '../actions/opensea/view'
import { METAMASK_VERIFY_START, METAMASK_VERIFY_SUCCESS, METAMASK_VERIFY_FAILURE } from '../actions/metamask/verify'
import { FETCH_TOKEN_START, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from '../actions/token/fetch'
import { CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE } from '../actions/product/create'
import { GET_PRODUCT_START, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from '../actions/product/get'

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn:false,
  data: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PUBLISH_PRODUCT_START:
		case VIEW_PRODUCT_START:
    case METAMASK_VERIFY_START:
		case METAMASK_SIGNUP_START:
		case METAMASK_LOGIN_START:
		case METAMASK_FETCH_START:
		case METAMASK_GET_START:
    case FETCH_TOKEN_START:
    case GET_PRODUCT_START:
    case CREATE_PRODUCT_START:
      	return { ...state, isLoading: true };
    case METAMASK_LOGIN_SUCCESS:
    case METAMASK_VERIFY_SUCCESS:
  		  return { ...state, isLoading: false, error: null, data: action.data}
  	case PUBLISH_PRODUCT_SUCCESS:
  	case VIEW_PRODUCT_SUCCESS:
  	case METAMASK_GET_SUCCESS:
    case FETCH_TOKEN_SUCCESS:
    case GET_PRODUCT_SUCCESS:
    case CREATE_PRODUCT_SUCCESS:
    case METAMASK_FETCH_FAILURE:
    case METAMASK_LOGIN_FAILURE:
    case METAMASK_SIGNUP_FAILURE:
    case METAMASK_GET_FAILURE:
    case PUBLISH_PRODUCT_FAILURE:
    case VIEW_PRODUCT_FAILURE:
    case METAMASK_VERIFY_FAILURE:
    case FETCH_TOKEN_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case GET_PRODUCT_FAILURE:
  		return { ...state, isLoading: false, error: null}
  	default:
    		return state;
	}
};