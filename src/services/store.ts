import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from './middleware/socket-middleware';
import { ORDERS_CONNECT, ORDERS_DISCONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_MESSAGE, ORDERS_WS_ERROR, ORDERS_WS_SEND_MESSAGE } from './actions/ws';
import { dataReducer } from './reducers/data'
import { constructorIngredientsReducer } from './reducers/constructor-inrgedients';
import { orderReducer } from './reducers/order-details';
import { authReducer } from './reducers/user';
import { ordersFeedReducer } from './reducers/ws'

const ordersFeedMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE,
  wsConnecting: ORDERS_WS_CONNECTING,
  wsDisconnect: ORDERS_DISCONNECT,
  wsSendMessage: ORDERS_WS_SEND_MESSAGE,
});

export const store = configureStore({
  reducer: {
    dataIngredients: dataReducer,
    constructorDataIngredients: constructorIngredientsReducer,
    order: orderReducer,
    auth: authReducer,
    ordersFeed: ordersFeedReducer
  },
  middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ordersFeedMiddleware)
  }
})
