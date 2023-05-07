import { useState, useMemo } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from '../BurgerIngredients/BurgerIngredients.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from "prop-types";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientsItem = ({ ingredient, selected }) => {
  return (
    <div className={ burgerIngredientsStyle.card } onClick={() => selected(ingredient)}>
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
  ingredient : ingredientPropTypes.isRequired,
  selected: PropTypes.func.isRequired
};

const BurgersIngredients = (props) => {

  const buns = useMemo(() => props.ingredients.filter((el) => el.type === "bun"), [props]);
  const sauces = useMemo(() => props.ingredients.filter((el) => el.type === "sauce"), [props]);
  const mains = useMemo(() => props.ingredients.filter((el) => el.type === "main"), [props]);

  const [current, setCurrent] = useState('one');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setSelectedIngredient(item);
  };

  const handleCloseModal = () => {
    setIsOpen(false)
  };

  const scrollElement = {
    'one': document.querySelector('#one'),
    'two': document.querySelector('#two'),
    'three': document.querySelector('#three')
  }

  const tabSelect = (tab) => {
    setCurrent(tab);
    console.log(tab);
    if (tab) scrollElement[tab].scrollIntoView({ behavior: "smooth" });
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
              <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
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
              <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
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
            <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
          </li>
          ))
        }
        </ul>
      </div>
      {isOpen &&
        (<Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails selectedIngredient={ selectedIngredient } />
        </Modal>)
      }
    </div>
  )
}

  BurgersIngredients.propTypes ={
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgersIngredients;
