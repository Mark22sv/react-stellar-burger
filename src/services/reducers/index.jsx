import { combineReducers } from 'redux';
import { dataReducer } from './data'
import { constructorIngredientsReducer } from './constructor-inrgedients';
import { orderReducer } from './order-details';
import { authReducer } from './user';
import { ordersFeedReducer } from './ws'

export const rootReducer = combineReducers({
  dataIngredients: dataReducer,
  constructorDataIngredients: constructorIngredientsReducer,
  order: orderReducer,
  auth: authReducer,
  ordersFeed: ordersFeedReducer
});
