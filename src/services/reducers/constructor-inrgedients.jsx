
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS
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
    default:
      return state;
  }
}
