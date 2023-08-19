import { WebsocketStatus } from "../../utils/ws";
import { ORDERS_WS_CONNECTING, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_MESSAGE, ORDERS_WS_SEND_MESSAGE, ORDERS_WS_ERROR, WsActions } from '../actions/ws';
import { Ingredient } from "../types/data";


type WsInitialState = {
  status: string;
  connectingError?: string;
  orders: Ingredient[];
  total: number;
  totalToday: number;
};

const initialState: WsInitialState = {
  status: WebsocketStatus.OFFLINE,
  connectingError: '',
  orders: [],
  total: 0,
  totalToday: 0
};

export const ordersFeedReducer = (state = initialState, action: WsActions) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      }

    case ORDERS_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      }

    case ORDERS_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      }

    case ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      }

    case ORDERS_WS_MESSAGE:
      return {
      ...state,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday
    }

    case ORDERS_WS_SEND_MESSAGE:
      return {
      ...state
    }
    
    default:
      return state;
  }
}
