console.log('hey');
import { createStore } from 'redux';
import todoApp from './reducers';
let store = createStore(todoApp);