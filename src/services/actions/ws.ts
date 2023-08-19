import { FeedOrder, FeedOrders } from "../types/data";

export const ORDERS_CONNECT: 'ORDERS_CONNECT' = 'ORDERS_CONNECT';
export const ORDERS_DISCONNECT: 'ORDERS_DISCONNECT' = 'ORDERS_DISCONNECT';
export const ORDERS_WS_CONNECTING: 'ORDERS_WS_CONNECTING' = 'ORDERS_WS_CONNECTING';
export const ORDERS_WS_OPEN: 'ORDERS_WS_OPEN' = 'ORDERS_WS_OPEN';
export const ORDERS_WS_CLOSE: 'ORDERS_WS_CLOSE' = 'ORDERS_WS_CLOSE';
export const ORDERS_WS_MESSAGE: 'ORDERS_WS_MESSAGE' = 'ORDERS_WS_MESSAGE';
export const ORDERS_WS_SEND_MESSAGE: 'ORDERS_WS_SEND_MESSAGE' = 'ORDERS_WS_SEND_MESSAGE';
export const ORDERS_WS_ERROR: 'ORDERS_WS_ERROR' = 'ORDERS_WS_ERROR';


export interface WsOrdersConnect {
  type: typeof ORDERS_CONNECT;
  payload: string;
};

export interface WsOrdersDisConnect {
  type: typeof ORDERS_DISCONNECT;
};

export interface WsOrdersConnecting {
  type: typeof ORDERS_WS_CONNECTING;
};

export interface WsOrdersOpen {
  type: typeof ORDERS_WS_OPEN;
};

export interface WsOrdersClose {
  type: typeof ORDERS_WS_CLOSE;
};

export interface WsOrdersMessage {
  type: typeof ORDERS_WS_MESSAGE;
  payload: FeedOrders;
};

export interface WsOrdersSendMessage {
  type: typeof ORDERS_WS_SEND_MESSAGE;
  payload: FeedOrder;
};

export interface WsOrdersError {
  type: typeof ORDERS_WS_ERROR;
  payload: string;
};

export function ordersConnectins(): WsOrdersConnecting {
  return { type: ORDERS_WS_CONNECTING };
};

export function ordersMessage(payload: FeedOrders): WsOrdersMessage {
  return { type: ORDERS_WS_MESSAGE, payload };
};

export function ordersSenMessage(payload: FeedOrder): WsOrdersSendMessage {
  return { type: ORDERS_WS_SEND_MESSAGE, payload };
};

export function connectionStart(payload: string): WsOrdersConnect {
  return { type: ORDERS_CONNECT, payload };
};

export const connect = (url: string) => (connectionStart(url));

export function connectionClosed(): WsOrdersDisConnect {
  return { type: ORDERS_DISCONNECT};
};

export const disconnect = () => (connectionClosed());

export function ordersCloseError(payload: string): WsOrdersError {
  return { type: ORDERS_WS_ERROR, payload };
};

export function ordersClose(): WsOrdersClose {
  return { type: ORDERS_WS_CLOSE };
};

export function ordersOpen(): WsOrdersOpen {
  return { type: ORDERS_WS_OPEN };
};


export type WsActions =
  | WsOrdersConnect
  | WsOrdersDisConnect
  | WsOrdersConnecting
  | WsOrdersOpen
  | WsOrdersClose
  | WsOrdersMessage
  | WsOrdersError
  | WsOrdersSendMessage


  export type WebSocketActions = {
    readonly wsConnect: typeof ORDERS_CONNECT;
    readonly wsSendMessage: typeof ORDERS_WS_SEND_MESSAGE;
    readonly onOpen: typeof ORDERS_WS_OPEN;
    readonly onClose: typeof ORDERS_WS_CLOSE;
    readonly onError: typeof ORDERS_WS_ERROR;
    readonly onMessage: typeof ORDERS_WS_MESSAGE;
    readonly wsConnecting: typeof ORDERS_WS_CONNECTING;
    readonly wsDisconnect: typeof ORDERS_DISCONNECT;
  };
