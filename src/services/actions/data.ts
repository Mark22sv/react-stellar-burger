import { AppDispatch, AppThunk } from '../index';
import { getDataIngredientsFetch } from '../../api/api';
import { Ingredient, IngredientsResponse } from '../types/data';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';


type GetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type GetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Ingredient[];
};

type GetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};



export type DataActions =
  | GetIngredientsRequest
  | GetIngredientsSuccess
  | GetIngredientsFailed;


const getIngredientsRequest = (): GetIngredientsRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

const getIngredientsSuccess = (res: IngredientsResponse): GetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    data: res.data
  }
}

const getIngredientsFailed = (): GetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}


export const getDataIngredients = (): AppThunk => (dispatch) => {
    dispatch(getIngredientsRequest());
    return getDataIngredientsFetch()
      .then(res =>
        dispatch(getIngredientsSuccess(res))
      )
      .catch(error => {
        dispatch(getIngredientsFailed());
        console.log(error);
      });

};
