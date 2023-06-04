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
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS,
  ADD_BUN_CONSRUCTOR,
  MOVE_CONSRUCTOR_INGREDIENTS
} from '../../services/actions/constructor-ingredients';
import { useDrop, useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep'


const IngredientsItem = ({ ingredient, removeElement, moveIngredient }) => {
  const { constructorDataIngredients } = useSelector(state => state.constructorDataIngredients);
  const index = constructorDataIngredients.indexOf(ingredient);
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
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => removeElement(ingredient)}
      />
    </li>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgerConstructor = () => {
  const { constructorDataIngredients } = useSelector(state => state.constructorDataIngredients);
  const dispatch = useDispatch();
  const constructorIngredients = useMemo(() => ({
    "bun": constructorDataIngredients.find((el) => el.type === "bun"),
    "saucesAndMains": constructorDataIngredients.filter((el) => el.type !== "bun")
  }), [constructorDataIngredients]);

  const [isOpen, setIsOpen] = useState(false);

   const handleOpenModal = () => {
    let order = {
      ingredients: []
    };
    for (let i = 0; i < constructorDataIngredients.length; i++){
      order = {ingredients: [...constructorDataIngredients, constructorDataIngredients[i]._id]};
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
      let bun, priceBun;
      if (constructorDataIngredients.find((el) => el.type === "bun")){
        bun = constructorDataIngredients.find((el) => el.type === "bun");
        priceBun = bun.price;
      } else priceBun = 0;
      return priceBun + constructorDataIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    },
    [constructorDataIngredients]

  );

  const removeIngredient = (ingredient) =>{
    dispatch({
      type: REMOVE_CONSRUCTOR_INGREDIENTS,
      payload: constructorDataIngredients.filter((el) => el.id !== ingredient.id)
    });
  };

  const [, dropTargetIngredients] = useDrop({
    accept: "ingredients",
    drop(item) {
      let newItem = cloneDeep(item);
      newItem.ingredient.id =  uuidv4();
      if ((constructorDataIngredients.find((el) => el.type === "bun"))
          && (newItem.ingredient.type === "bun"))
      {
        (constructorDataIngredients.filter((el) => el.type !== "bun").length > 0)
        ? dispatch({
          type: ADD_BUN_CONSRUCTOR,
          payload: [...constructorDataIngredients.filter((el) => el.type !== "bun"), newItem.ingredient]
        })
        : dispatch({
          type: ADD_BUN_CONSRUCTOR,
          payload: [newItem.ingredient]
        })
      } else {
          dispatch({
            type: ADD_CONSRUCTOR_INGREDIENTS,
            payload: [...constructorDataIngredients, newItem.ingredient]
          });
        }
    },

  });

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = constructorDataIngredients[dragIndex];
        const hoverItem = constructorDataIngredients[hoverIndex];
        // Swap places of dragItem and hoverItem in the array
        const updateConstructorDataIngredients = [...constructorDataIngredients];
        updateConstructorDataIngredients[dragIndex] = hoverItem;
        updateConstructorDataIngredients[hoverIndex] = dragItem;
        dispatch({
          type: MOVE_CONSRUCTOR_INGREDIENTS,
          payload: updateConstructorDataIngredients
        });
    },
    [constructorDataIngredients, dispatch],
  )

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}
      ref={ dropTargetIngredients }
    >
      {constructorIngredients.bun &&
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${constructorIngredients.bun.name} '(верх)'`}
          price={constructorIngredients.bun.price}
          thumbnail={constructorIngredients.bun.image_mobile}
        />
      }
      <ul className={ burgerConstructorStyle.list }>
        {constructorIngredients.saucesAndMains &&
          constructorIngredients.saucesAndMains
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
      {constructorIngredients.bun &&
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${constructorIngredients.bun.name} '(низ)'`}
        price={constructorIngredients.bun.price}
        thumbnail={constructorIngredients.bun.image_mobile}
      />
      }
      <div className={`${burgerConstructorStyle.order} pt-10 pr-4`}>
        <div className={`${burgerConstructorStyle.price}`}>
          <p className="text text_type_digits-medium">{ totalSum }</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
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



export default BurgerConstructor;


