import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app'
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { ORDERS_CONNECT, ORDERS_DISCONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_MESSAGE, ORDERS_WS_ERROR } from './services/actions/ws';

const ordersFeedMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE,
  wsConnecting: ORDERS_WS_CONNECTING,
  wsDisconnect: ORDERS_DISCONNECT
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, ordersFeedMiddleware));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
