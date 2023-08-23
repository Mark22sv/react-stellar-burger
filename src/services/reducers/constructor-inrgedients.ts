
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS,
  ADD_BUN_CONSRUCTOR,
  MOVE_CONSRUCTOR_INGREDIENTS,
  RESET_CONSRUCTOR_INGREDIENTS,
  ConstructorIngredientsActions
} from '../actions/constructor-ingredients';
import { Ingredient } from '../types/data';

export type ConstructorIngredientsState = {
  bun: Ingredient | null;
  ingredients: Ingredient[];
};

const initialState: ConstructorIngredientsState = {
  bun: null,
  ingredients: []
};

export function constructorIngredientsReducer(state = initialState, action: ConstructorIngredientsActions): ConstructorIngredientsState {
  switch (action.type) {
    case ADD_CONSRUCTOR_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case REMOVE_CONSRUCTOR_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      };
    case ADD_BUN_CONSRUCTOR:
      return {
        ...state,
        bun: action.payload
      };
    case MOVE_CONSRUCTOR_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      };
    case RESET_CONSRUCTOR_INGREDIENTS:
      return {
        bun: null,
        ingredients: [] };
    default:
      return state;
  }
}
