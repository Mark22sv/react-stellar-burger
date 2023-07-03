import React from 'react';
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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
  ADD_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT
} from '../../services/actions/data';
import { useDrag } from "react-dnd";
import { useInView } from 'react-intersection-observer';
import { getSelectorDataIngredients, getSelectorConstuctorIngredients } from '../../utils/get-selector';
import { Link, useLocation } from 'react-router-dom';


const IngredientsItem = ({ ingredient, selected }) => {

  const { bun, ingredients } = useSelector(getSelectorConstuctorIngredients, shallowEqual);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? .5 : 1
    })
  });

  const counter = useMemo(
		() =>
			(count = 0) => {
				for (let { _id } of ingredients)
					if (_id === ingredient._id) count++;

				if (bun && bun._id === ingredient._id)
        return 2;

        return count;
			},
		[bun, ingredients, ingredient._id]
	);

  return (
    <div className={ burgerIngredientsStyle.card }
         style={{ opacity }}
         ref={dragRef}
         onClick={() => selected(ingredient)}
    >
      <img className={ `${burgerIngredientsStyle.image} ml-4 mr-4` } src={ ingredient.image } alt="фото" />
      <Counter className={ burgerIngredientsStyle.count } count={counter()} size="default" extraClass="m-1" />
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

  const { data, selectedIngredient } = useSelector(getSelectorDataIngredients, shallowEqual);
  const dispatch = useDispatch()
  const location = useLocation();

  const dataIngredients = useMemo(() => ({
    "buns": data.filter((el) => el.type === "bun"),
    "sauces": data.filter((el) => el.type === "sauce"),
    "mains": data.filter((el) => el.type === "main")
  }), [data]);

  const [current, setCurrent] = useState('one');
  //const [isOpen, setIsOpen] = useState(false);


  const handleOpenModal = (item) => {
    // setIsOpen(true);
    // dispatch({type: ADD_SELECTED_INGREDIENT, data: item});
  };

  const handleCloseModal = () => {
    // setIsOpen(false);
    // dispatch({type: RESET_SELECTED_INGREDIENT});
  };

  const [bunRef, bunInView] = useInView({
		threshold: .1
	});
	const [sauceRef, sauceInView] = useInView({
		threshold: .1
	});
	const [mainRef, mainInView] = useInView({
		threshold: .1
	});

  const handleIngredientScroll = () => {
		switch (true) {
			case bunInView:
				setCurrent('bun');
				break;
			case sauceInView:
				setCurrent('sauce');
				break;
			case mainInView:
				setCurrent('main');
				break;
			default:
				break;
		}
	};

  useEffect(() => {
		handleIngredientScroll();
	}, [bunInView, sauceInView, mainInView]);


  const scrollElement = {
    'bun': document.querySelector('#bun'),
    'sauce': document.querySelector('#sauce'),
    'main': document.querySelector('#main')
  }

  const tabSelect = (tab) => {
    setCurrent(tab);
    tab && scrollElement[tab].scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <h1 className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <a href="#bun" className={ burgerIngredientsStyle.link }>
          <Tab value="bun" active={current === 'bun'} onClick={tabSelect}>
            Булки
          </Tab>
        </a>
        <a href="#sauce" className={ burgerIngredientsStyle.link }>
          <Tab value="sauce" active={current === 'sauce'} onClick={tabSelect}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={ burgerIngredientsStyle.link }>
          <Tab value="main" active={current === 'main'} onClick={tabSelect}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={ `${burgerIngredientsStyle.container} pt-10` } >
        <h2 className="text text_type_main-medium" id="bun" ref={ bunRef }>
          Булки
        </h2>
        <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
          {dataIngredients.buns.map((item, index) => (
            <li key={index}>
              <Link
                className={ burgerIngredientsStyle.ingridient__link }
                to={{ pathname: `/ingredients/${item._id}` }}
                state={{ background: location }}
              >
                <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
              </Link>
            </li>
            ))
          }
        </ul>
        <h2 className="text text_type_main-medium" id="sauce" ref={ sauceRef }>
          Соусы
        </h2>
        <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
          {dataIngredients.sauces.map((item, index) => (
            <li key={index}>
              <Link
                className={ burgerIngredientsStyle.ingridient__link }
                to={{ pathname: `/ingredients/${item._id}` }}
                state={{ background: location }}
              >
                <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
              </Link>
            </li>
            ))
          }
        </ul>
        <h2 className="text text_type_main-medium" id="main" ref={ mainRef } >
          Начинки
        </h2>
        <ul className={ `${burgerIngredientsStyle.list} pt-6 pb-10` }>
        {dataIngredients.mains.map((item, index) => (
          <li key={index}>
            <Link
                className={ burgerIngredientsStyle.ingridient__link }
                to={{ pathname: `/ingredients/${item._id}` }}
                state={{ background: location }}
            >
              <IngredientsItem ingredient={ item } selected={ handleOpenModal } />
            </Link>
          </li>
          ))
        }
        </ul>
      </div>
      {/* {isOpen &&
        (<Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails selectedIngredient={ selectedIngredient } />
        </Modal>)
      } */}
    </div>
  )
}

export default React.memo(BurgersIngredients);
