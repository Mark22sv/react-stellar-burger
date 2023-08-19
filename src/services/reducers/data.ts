import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         ADD_SELECTED_INGREDIENT,
         RESET_SELECTED_INGREDIENT,
         DataActions
        } from '../actions/data';
import { Ingredient } from '../types/data';

export type DataState = {
  data: Ingredient[];
  dataRequest: Boolean;
  dataFailed: Boolean;
  selectedIngredient: Ingredient[];
};

const initialState: DataState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  selectedIngredient: []
};

export const dataReducer = (state = initialState, action: DataActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        dataRequest: true,
        dataFailed: false
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataRequest: false
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        data: [],
        dataFailed: true,
        dataRequest: false
      };

    case ADD_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.data
      };

    case RESET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: []
      };

    default:
      return state;

  }
}

