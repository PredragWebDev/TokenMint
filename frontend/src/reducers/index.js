import { combineReducers } from 'redux';

import SessionReducer from './session';
import ProductReducer from './product';

const rootReducer = combineReducers({
  session: SessionReducer,
  product: ProductReducer
});

export default rootReducer;
