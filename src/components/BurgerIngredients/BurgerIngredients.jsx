import React from 'react';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from '../BurgerIngredients/BurgerIngredients.module.css';
import ingredientPropTypes from '../utils/prop-types';
import PropTypes from "prop-types";


const IngredientsItem = ({ ingredient }) => {
  return (
    <div className={ burgerIngredientsStyle.card }>
      <img className={ `${burgerIngredientsStyle.image} ml-4 mr-4` } src={ ingredient.image } alt="фото" />
      <Counter className={ burgerIngredientsStyle.count } count={1} size="default" extraClass="m-1" />
      <div className={ `${burgerIngredientsStyle.price} mt-1 mb-1` }>
        <p>
          { ingredient.price }
        </p>
        <CurrencyIcon />
      </div>
      <p>
        { ingredient.name }
      </p>
    </div>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgersIngredients = (props) => {
    const [current, setCurrent] = React.useState('one')
    const buns = props.ingredients.data.filter((el) => el.type === "bun"),
          sauces = props.ingredients.data.filter((el) => el.type === "sauce"),
          mains = props.ingredients.data.filter((el) => el.type === "main");

    const scrollElement = {
      'one': document.querySelector('#one'),
      'two': document.querySelector('#two'),
      'three': document.querySelector('#three')
    }

    const tabSelect = (tab) => {
      setCurrent(tab);
      scrollElement[tab].scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div>
        <h1 className="text text_type_main-large pt-10 pb-5">
          Соберите бургер
        </h1>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={tabSelect}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={tabSelect}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={tabSelect}>
            Начинки
          </Tab>
        </div>
        <div className={ `${burgerIngredientsStyle.container} pt-10` }>
          <h2 className="text text_type_main-medium" id="one">
            Булки
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
            {buns.map((item, index) => (
              <li key={index}>
                <IngredientsItem ingredient={ item } />
              </li>
              ))
            }
          </ul>
          <h2 className="text text_type_main-medium" id="two">
            Соусы
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
            {sauces.map((item, index) => (
              <li key={index}>
                <IngredientsItem ingredient={ item } />
              </li>
              ))
            }
          </ul>
          <h2 className="text text_type_main-medium" id="three">
            Начинки
          </h2>
          <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
          {mains.map((item, index) => (
            <li key={index}>
              <IngredientsItem ingredient={ item } />
            </li>
            ))
          }
          </ul>
        </div>
      </div>
    )
  }

  BurgersIngredients.propTypes ={
    ingredients: PropTypes.shape({
     data: PropTypes.arrayOf(ingredientPropTypes)}).isRequired
  };

export default BurgersIngredients;
