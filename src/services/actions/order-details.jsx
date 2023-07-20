import { setOrderFetch, getOrderIngredientsFetch } from '../../api/api';
import {
  RESET_CONSRUCTOR_INGREDIENTS
} from './constructor-ingredients';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_ORDER_INGREDIENTS_REQUEST = 'GET_ORDER_INGREDIENTS_REQUEST';
export const GET_ORDER_INGREDIENTS_SUCCESS = 'GET_ORDER_INGREDIENTS_SUCCESS';
export const GET_ORDER_INGREDIENTS_FAILED = 'GET_ORDER_INGREDIENTS_FAILED';

export const RESET_ORDER ='RESET_ORDER';


export const setOrder = (order) => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    setOrderFetch(order)
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: res.order.number
        });
        dispatch({
          type: RESET_CONSRUCTOR_INGREDIENTS
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_FAILED
        });
        console.log(error);
      });
  };
};

export function getOrderIngredients(number) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_INGREDIENTS_REQUEST
    });
    getOrderIngredientsFetch(number)
      .then(res => {
        dispatch({
          type: GET_ORDER_INGREDIENTS_SUCCESS,
          payload: res.orders[0]
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INGREDIENTS_FAILED
        });
        console.log(error);
      });
  };
};

// export const getOrderIngredients = (number) => {
//   getOrderIngredientsFetch(number)
//     .then((res) => {
//       return res.orders[0]
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// };
