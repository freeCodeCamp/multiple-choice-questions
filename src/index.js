import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './utils/registerServiceWorker';

import App from './App';
import './styles/index.css';
import reducer from './redux/reducer';

/* Creat the Redux store */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* Serve the App */
const Index = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Index, document.getElementById('root'));
registerServiceWorker();
