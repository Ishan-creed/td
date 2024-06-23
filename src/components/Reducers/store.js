import { createStore } from 'redux';
import modalReducer from './modalReducer';

const store = createStore(modalReducer);

export default store;
