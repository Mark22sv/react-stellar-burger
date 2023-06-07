import { GET_ORDER_REQUEST,
         GET_ORDER_SUCCESS,
         GET_ORDER_FAILED,
         RESET_ORDER
 } from '../actions/order-details';

const initialState = {
  orderNumber: '',
  dataRequest: false,
  dataFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        dataRequest: true,
        dataFailed: false
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        dataRequest: false
      };

    case GET_ORDER_FAILED:
      return {
        orderNumber: '',
        dataFailed: true,
        dataRequest: false
      };

    case RESET_ORDER:
      return {
        ...state,
        orderNumber: ''
      };

    default:
      return state;

}
}

