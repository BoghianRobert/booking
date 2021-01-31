import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss'
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducers';


const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
