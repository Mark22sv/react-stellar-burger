import { setOrderFetch, getOrderIngredientsFetch } from '../../api/api';
import { OrderData } from '../types/data';
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
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber?: OrderData;
};

type GetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

type GetOrderIngredientsSuccess = {
  readonly type: typeof GET_ORDER_INGREDIENTS_SUCCESS;
  readonly payload?: OrderData;
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

const getOrderSuccess = (ingredients: OrderData): GetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    orderNumber: ingredients
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

const getOrderIngredientsSuccess = (number: OrderData): GetOrderIngredientsSuccess => {
  return {
    type: GET_ORDER_INGREDIENTS_SUCCESS,
    payload: number
  }
};

const getOrderIngredientsFailed = (): GetOrderIngredientsFailed => {
  return {
    type: GET_ORDER_INGREDIENTS_FAILED,
  }
};

export const setOrder = (order) => {
  return function(dispatch) {
    dispatch(getOrderRequest());
    setOrderFetch(order)
      .then(res => {
        dispatch(getOrderSuccess(res.order.number)         );
        dispatch({
          type: RESET_CONSRUCTOR_INGREDIENTS
        });
      })
      .catch(error => {
        dispatch(getOrderFailed());
        console.log(error);
      });
  };
};

export function getOrderIngredients(number) {
  return function(dispatch) {
    dispatch(getOrderIngredientsRequest);
    getOrderIngredientsFetch(number)
      .then(res => {
        dispatch(getOrderIngredientsSuccess(res.orders[0]));
      })
      .catch(error => {
        dispatch(getOrderIngredientsFailed);
        console.log(error);
      });
  };
};

