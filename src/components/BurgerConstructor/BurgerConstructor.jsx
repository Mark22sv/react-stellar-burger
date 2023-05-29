import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../utils/prop-types";
import { useState, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { setOrder, RESET_ORDER } from "../../services/actions/order-details";
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_CONSRUCTOR_INGREDIENTS,
  REMOVE_CONSRUCTOR_INGREDIENTS
} from '../../services/actions/constructor-ingredients';


const IngredientsItem = ({ ingredient, removeElement }) => {

  return (
    <div className={ burgerConstructorStyle.element } >
      <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={() => removeElement(ingredient)}
      />
    </div>
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
    const newconstructorIngredients = constructorDataIngredients.filter((el) => el._id !== ingredient._id);
    dispatch({type: REMOVE_CONSRUCTOR_INGREDIENTS, payload: newconstructorIngredients});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}>
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
        {constructorIngredients.saucesAndMains.map((item, index) => (
          <li className={ burgerConstructorStyle.item } key={index}>
            <DragIcon type="primary" />
            <IngredientsItem ingredient={ item } removeElement={ removeIngredient }/>
          </li>
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


