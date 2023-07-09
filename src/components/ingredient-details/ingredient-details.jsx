import React from 'react';
import ingredientDetails from './ingredient-details.module.css';
import { useSelector, shallowEqual } from "react-redux";
import { getSelectorDataIngredients } from '../../utils/get-selector';
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { data } = useSelector(getSelectorDataIngredients, shallowEqual);
  const { id } = useParams();
  const selectedIngredient = data.find((item) => item._id === id);

 return (
  <>
    {selectedIngredient && (
      <div className={`${ ingredientDetails.container } `}>
        <figure className={`${ingredientDetails.figure} `}>
          <img src={selectedIngredient.image_large} alt="картинка ингредиента" />
          <figcaption className={`${ingredientDetails.caption} text text_type_main-medium`}>{selectedIngredient.name}</figcaption>
        </figure>
        <ul className={`${ ingredientDetails.list } pt-8`}>
          <li className={`${ ingredientDetails.item } `}>
            <p className={`${ingredientDetails.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
            <p className={`${ingredientDetails.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.calories}</p>
          </li>
          <li className={`${ ingredientDetails.item } `}>
            <p className={`${ingredientDetails.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
            <p className={`${ingredientDetails.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.proteins}</p>
          </li>
          <li className={`${ ingredientDetails.item } `}>
            <p className={`${ingredientDetails.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
            <p className={`${ingredientDetails.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.fat}</p>
          </li>
          <li className={`${ ingredientDetails.item } `}>
            <p className={`${ingredientDetails.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
            <p className={`${ingredientDetails.text} text text_type_digits-default text_color_inactive`}>{selectedIngredient.carbohydrates}</p>
          </li>
        </ul>
      </div>
    )}
  </>
  );
}

export default React.memo(IngredientDetails);
