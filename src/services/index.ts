import { store } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { ConstructorIngredientsActions } from './actions/constructor-ingredients';
import { DataActions } from './actions/data';
import { OrderDetailsActions } from './actions/order-details';
import { UserActions } from './actions/user';
import { WsActions } from './actions/ws';




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ApplicationActions =
  | ConstructorIngredientsActions
  | DataActions
  | OrderDetailsActions
  | UserActions
  | WsActions;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ApplicationActions>;



