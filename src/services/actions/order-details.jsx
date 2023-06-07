import { setOrderFetch } from '../../api/api';
import {
  RESET_CONSRUCTOR_INGREDIENTS
} from './constructor-ingredients';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
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
