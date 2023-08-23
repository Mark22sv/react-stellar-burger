import { GET_ORDER_REQUEST,
         GET_ORDER_SUCCESS,
         GET_ORDER_FAILED,

         GET_ORDER_INGREDIENTS_REQUEST,
         GET_ORDER_INGREDIENTS_SUCCESS,
         GET_ORDER_INGREDIENTS_FAILED,

         RESET_ORDER,
         OrderDetailsActions
 } from '../actions/order-details';
import { Ingredient, OrderIngredient } from '../types/data';

export type OrderDetailsState = {
  orderNumber: number | null;
  orderIngredient: OrderIngredient | null;
  dataRequest: boolean;
  dataFailed: boolean;
  clickOnOrder: boolean;
}

const initialState: OrderDetailsState = {
  orderNumber: null,
  orderIngredient: null,
  dataRequest: false,
  dataFailed: false,
  clickOnOrder: false
};

export const orderReducer = (state = initialState, action: OrderDetailsActions): OrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
        clickOnOrder: true
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        dataRequest: false,
        clickOnOrder: true
      };

    case GET_ORDER_FAILED:
      return {
        orderNumber: '',
        dataFailed: true,
        dataRequest: false
      };

      case GET_ORDER_INGREDIENTS_REQUEST:
        return {
          ...state,
          dataRequest: true,
          dataFailed: false
        };

      case GET_ORDER_INGREDIENTS_SUCCESS:
        return {
          ...state,
          orderIngredient: action.orders,
          dataRequest: false
        };

      case GET_ORDER_INGREDIENTS_FAILED:
        return {
          orderIngredient: [],
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

