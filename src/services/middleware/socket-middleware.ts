import { MiddlewareAPI, Middleware } from "redux";
import { WebSocketActions } from "../actions/ws";
import { AppDispatch, RootState } from "..";

export const socketMiddleware = (wsActions: WebSocketActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

      return next => action => {
          const { dispatch } = store;
          const { type } = action;
          const {
              wsConnect,
              wsSendMessage,
              onOpen,
              onClose,
              onError,
              onMessage,
              wsConnecting,
              wsDisconnect,
          } = wsActions;

          if (type === wsConnect) {
              socket = new WebSocket(action.payload);
              dispatch({type: wsConnecting});
          }

          if (socket) {
              socket.onopen = () => {
                  dispatch({ type: onOpen });
              };

              socket.onerror = () => {
                  dispatch({ type: onError, payload: 'Error' });
              };

              socket.onmessage = event => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);

                  dispatch({ type: onMessage, payload: parsedData });
              };

              socket.onclose = () => {
                  dispatch({ type: onClose });
              };

              if (type === wsSendMessage) {
                  socket.send(JSON.stringify(action.payload));
              }

              if (wsSendMessage && type === wsDisconnect) {
                  socket.close();
                  socket = null;
              }
          }

          next(action);
      };
  };
};
