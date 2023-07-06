import React from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../utils/prop-types";
import { useState, useMemo, useRef, useCallback } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { setOrder, RESET_ORDER } from "../../services/actions/order-details";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { getSelectorAuth } from "../../utils/get-selector"
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS,
  ADD_BUN_CONSRUCTOR,
  MOVE_CONSRUCTOR_INGREDIENTS
} from '../../services/actions/constructor-ingredients';
import { useDrop, useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep'
import { getSelectorConstuctorIngredients } from '../../utils/get-selector';

const IngredientsItem = ({ ingredient, removeElement, moveIngredient }) => {

  const { ingredients } = useSelector(getSelectorConstuctorIngredients, shallowEqual);
  const index = ingredients.indexOf(ingredient);
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item:  { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))
  const opacity = isDragging ? 0 : 1

  return (
    <li
      className={ burgerConstructorStyle.item }
      ref={ dragDropRef }
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <div className={ burgerConstructorStyle.element }>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={() => removeElement(ingredient)}
        />
      </div>
    </li>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector(getSelectorConstuctorIngredients, shallowEqual);
  const dispatch = useDispatch();
  const { user } = useSelector(getSelectorAuth, shallowEqual);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (user === null) navigate("/login", { replace: true });
    const ingredientsId = ingredients.map((item) => item._id)
    const order = {
        "ingredients": [...ingredientsId, bun._id]
        }
    dispatch(setOrder(order));
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch({type: RESET_ORDER});
  };

  const totalSum = useMemo(
    () => {
      let priceBun;
      if (bun){
        priceBun = bun.price*2;
      } else priceBun = 0;
      return priceBun + ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    },
    [bun, ingredients]

  );

  const removeIngredient = (ingredient) =>{
    dispatch({
      type: REMOVE_CONSRUCTOR_INGREDIENTS,
      payload: ingredients.filter((el) => el.id !== ingredient.id)
    });
  };

  const [, dropTargetIngredients] = useDrop({
    accept: "ingredients",
    drop(item) {
      let newItem = cloneDeep(item);
      newItem.ingredient.id =  uuidv4();
      if (newItem.ingredient.type === "bun")
      {
        dispatch({
          type: ADD_BUN_CONSRUCTOR,
          payload: newItem.ingredient
        })
      } else {
          dispatch({
            type: ADD_CONSRUCTOR_INGREDIENTS,
            payload: newItem.ingredient
          });
        }
    },

  });

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = ingredients[dragIndex];
        const hoverItem = ingredients[hoverIndex];
        // Swap places of dragItem and hoverItem in the array
        const updateConstructorIngredients = [...ingredients];
        updateConstructorIngredients[dragIndex] = hoverItem;
        updateConstructorIngredients[hoverIndex] = dragItem;
        dispatch({
          type: MOVE_CONSRUCTOR_INGREDIENTS,
          payload: updateConstructorIngredients
        });
    },
    [ingredients, dispatch],
  )

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}
      ref={ dropTargetIngredients }
    >
      {bun &&
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} '(верх)'`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      }
      <ul className={ burgerConstructorStyle.list }>
        {ingredients &&
          ingredients
            .map((item) => (
              <IngredientsItem
                ingredient={ item }
                key={ item.id }
                removeElement={ removeIngredient }
                moveIngredient={ moveIngredient }
              />
            ))
        }
      </ul>
      {bun &&
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} '(низ)'`}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
      }
      <div className={`${burgerConstructorStyle.order} pt-10 pr-4`}>
        <div className={`${burgerConstructorStyle.price}`}>
          <p className="text text_type_digits-medium">{ totalSum }</p>
          <CurrencyIcon type="primary" />
        </div>
        {ingredients.length === 0 || !bun
        ? (<Button
            htmlType="button"
            type="primary"
            size="large"
            disabled
            onClick={handleOpenModal}>
            Оформить заказ
          </Button>)
        : (<Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}>
          Оформить заказ
          </Button>)}
      </div>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails/>
        </Modal>
        )
      }
    </div>
  )
}

export default React.memo(BurgerConstructor);


