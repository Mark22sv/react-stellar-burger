import { AppDispatch, AppThunk } from '../index';
import { getDataIngredientsFetch } from '../../api/api';
import { Ingredient } from '../types/data';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const ADD_SELECTED_INGREDIENT: 'ADD_SELECTED_INGREDIENT' = 'ADD_SELECTED_INGREDIENT';
export const RESET_SELECTED_INGREDIENT: 'RESET_SELECTED_INGREDIENT' = 'RESET_SELECTED_INGREDIENT';

type GetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type GetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data?: Ingredient[];
};

type GetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

type AddSelectedIngredient = {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  readonly data?: Ingredient;
};

type ResetSelectedIngredient = {
  readonly type: typeof RESET_SELECTED_INGREDIENT;
};

export type DataActions =
  | GetIngredientsRequest
  | GetIngredientsSuccess
  | GetIngredientsFailed
  | AddSelectedIngredient
  | ResetSelectedIngredient

const getIngredientsRequest = (): GetIngredientsRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

const getIngredientsSuccess = (ingredients: Ingredient[]): GetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    data: ingredients
  }
}

const getIngredientsFailed = (): GetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}


export const getDataIngredients = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    return getDataIngredientsFetch()
      .then(res =>
        dispatch(getIngredientsSuccess(res.data))
      )
      .catch(error => {
        dispatch(getIngredientsFailed());
        console.log(error);
      });

};
