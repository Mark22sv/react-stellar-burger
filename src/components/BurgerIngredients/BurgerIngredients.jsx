import { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS
} from '../../services/actions/constructor-ingredients';
import {
  ADD_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT
} from '../../services/actions/data';



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

const BurgersIngredients = () => {
  const { data, selectedIngredient } = useSelector(state => state.dataIngredients);
  const { constructorDataIngredients } = useSelector(state => state.constructorDataIngredients);
  const dispatch = useDispatch()

  const dataIngredients = useMemo(() => ({
    "buns": data.filter((el) => el.type === "bun"),
    "sauces": data.filter((el) => el.type === "sauce"),
    "mains": data.filter((el) => el.type === "main")
  }), [data]);

  const [current, setCurrent] = useState('one');
  const [isOpen, setIsOpen] = useState(false);


  const handleOpenModal = (item) => {
    // setIsOpen(true);
    // dispatch({type: ADD_SELECTED_INGREDIENT, data: item});
    if ((constructorDataIngredients.find((el) => el.type === "bun")) && (item.type === "bun")){
      console.log("Булка уже выбрана");
    } else {
        const newOrderIngredients = [...constructorDataIngredients, item];
        dispatch({type: ADD_CONSRUCTOR_INGREDIENTS, payload: newOrderIngredients});
      }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch({type: RESET_SELECTED_INGREDIENT});
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
          {dataIngredients.buns.map((item, index) => (
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
          {dataIngredients.sauces.map((item, index) => (
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
        {dataIngredients.mains.map((item, index) => (
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

export default BurgersIngredients;
