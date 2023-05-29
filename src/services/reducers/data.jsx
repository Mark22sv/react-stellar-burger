import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         ADD_SELECTED_INGREDIENT,
         RESET_SELECTED_INGREDIENT
        } from '../actions/data';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  selectedIngredient: []
};

export const dataReducer = (state = initialState, action) => {
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

