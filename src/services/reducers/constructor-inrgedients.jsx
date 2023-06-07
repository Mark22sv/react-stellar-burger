
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS,
  ADD_BUN_CONSRUCTOR,
  MOVE_CONSRUCTOR_INGREDIENTS,
  RESET_CONSRUCTOR_INGREDIENTS
} from '../actions/constructor-ingredients';

const initialState = {
  constructorDataIngredients: []
};

export function constructorIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONSRUCTOR_INGREDIENTS:
      return { constructorDataIngredients: action.payload };
    case REMOVE_CONSRUCTOR_INGREDIENTS:
      return { constructorDataIngredients: action.payload };
    case ADD_BUN_CONSRUCTOR:
      return { constructorDataIngredients: action.payload };
    case MOVE_CONSRUCTOR_INGREDIENTS:
      return { constructorDataIngredients: action.payload };
    case RESET_CONSRUCTOR_INGREDIENTS:
      return { constructorDataIngredients: [] };
    default:
      return state;
  }
}
