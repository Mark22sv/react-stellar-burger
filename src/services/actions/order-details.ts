import { AppThunk } from '..';
import { setOrderFetch, getOrderIngredientsFetch } from '../../api/api';
import { OrderIngredient, OrderResponse } from '../types/data';
import {
  RESET_CONSRUCTOR_INGREDIENTS
} from './constructor-ingredients';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const GET_ORDER_INGREDIENTS_REQUEST: 'GET_ORDER_INGREDIENTS_REQUEST' = 'GET_ORDER_INGREDIENTS_REQUEST';
export const GET_ORDER_INGREDIENTS_SUCCESS: 'GET_ORDER_INGREDIENTS_SUCCESS' = 'GET_ORDER_INGREDIENTS_SUCCESS';
export const GET_ORDER_INGREDIENTS_FAILED: 'GET_ORDER_INGREDIENTS_FAILED' = 'GET_ORDER_INGREDIENTS_FAILED';

export const RESET_ORDER: 'RESET_ORDER' = 'RESET_ORDER';

type GetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

type GetOrderSuccess = {
  type: typeof GET_ORDER_SUCCESS;
  orderNumber: number;
};

type GetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

type GetOrderIngredientsSuccess = {
  readonly type: typeof GET_ORDER_INGREDIENTS_SUCCESS;
  readonly orders: OrderIngredient;
};

type GetOrderIngredientsRequest = {
  readonly type: typeof GET_ORDER_INGREDIENTS_REQUEST;
};

type GetOrderIngredientsFailed = {
  readonly type: typeof GET_ORDER_INGREDIENTS_FAILED;
};

type ResetOrder = {
  readonly type: typeof RESET_ORDER;
};

export type OrderDetailsActions =
| GetOrderRequest
| GetOrderSuccess
| GetOrderFailed
| GetOrderIngredientsRequest
| GetOrderIngredientsSuccess
| GetOrderIngredientsFailed
| ResetOrder

const getOrderRequest = (): GetOrderRequest => {
  return {
    type: GET_ORDER_REQUEST,
  }
};


const getOrderSuccess = (res: OrderResponse): GetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    orderNumber: res.order.number
  }
};

const getOrderFailed = (): GetOrderFailed => {
  return {
    type: GET_ORDER_FAILED,

  }
};

const getOrderIngredientsRequest = (): GetOrderIngredientsRequest => {
  return {
    type: GET_ORDER_INGREDIENTS_REQUEST,
  }
};


const getOrderIngredientsSuccess = (orders: OrderIngredient): GetOrderIngredientsSuccess => {
  return {
    type: GET_ORDER_INGREDIENTS_SUCCESS,
    orders
  }
};

const getOrderIngredientsFailed = (): GetOrderIngredientsFailed => {
  return {
    type: GET_ORDER_INGREDIENTS_FAILED,
  }
};

export const setOrder = (order: string[]): AppThunk => (dispatch) => {
  dispatch(getOrderRequest());
  return  setOrderFetch(order)
    .then(res => {
      dispatch(getOrderSuccess(res));
      dispatch({
        type: RESET_CONSRUCTOR_INGREDIENTS
      });
    })
    .catch(error => {
      dispatch(getOrderFailed());
      console.log(error);
    });

};

export const getOrderIngredients = (number: number): AppThunk => (dispatch) => {
    dispatch(getOrderIngredientsRequest);
    return getOrderIngredientsFetch(number)
      .then(res => {
        dispatch(getOrderIngredientsSuccess(res.orders[0]));
      })
      .catch(error => {
        dispatch(getOrderIngredientsFailed);
        console.log(error);
      });
};

