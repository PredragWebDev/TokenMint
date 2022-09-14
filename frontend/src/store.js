import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  whitelist: ['session'],
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

export default store;
export const persistor = persistStore(store);
