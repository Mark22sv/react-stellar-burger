import { Ingredient } from "../types/data";

export const ADD_CONSRUCTOR_INGREDIENTS: 'ADD_ORDER_INGREDIENTS' = 'ADD_ORDER_INGREDIENTS';
export const REMOVE_CONSRUCTOR_INGREDIENTS: 'REMOVE_ORDER_INGREDIENTS' = 'REMOVE_ORDER_INGREDIENTS';
export const ADD_BUN_CONSRUCTOR: 'ADD_BUN_CONSRUCTOR' = 'ADD_BUN_CONSRUCTOR';
export const MOVE_CONSRUCTOR_INGREDIENTS: 'MOVE_CONSRUCTOR_INGREDIENTS' = 'MOVE_CONSRUCTOR_INGREDIENTS';
export const RESET_CONSRUCTOR_INGREDIENTS:'RESET_CONSRUCTOR_INGREDIENTS' = 'RESET_CONSRUCTOR_INGREDIENTS';

type AddConstructorIngredients = {
  readonly type: typeof ADD_CONSRUCTOR_INGREDIENTS;
  payload: Ingredient;
};

type RemoveConstructorIngredients = {
  readonly type: typeof REMOVE_CONSRUCTOR_INGREDIENTS;
  payload: Ingredient[];
};

type AddBunConstructor  = {
  readonly type: typeof ADD_BUN_CONSRUCTOR;
  payload: Ingredient;
};

type MoveConstructorIngredients = {
  readonly type: typeof MOVE_CONSRUCTOR_INGREDIENTS;
  payload: Ingredient[];
};

type ResetConstructorIngredients = {
  readonly type: typeof RESET_CONSRUCTOR_INGREDIENTS;
};

export type ConstructorIngredientsActions =
| AddConstructorIngredients
| RemoveConstructorIngredients
| AddBunConstructor
| MoveConstructorIngredients
| ResetConstructorIngredients
