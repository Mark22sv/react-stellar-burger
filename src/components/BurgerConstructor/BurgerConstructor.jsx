import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useState, useMemo, useContext } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from '../services/IngredientsContext';

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
  const { dataIngredients, setDataIngredients } = useContext(IngredientsContext);

  const bun = useMemo(() => dataIngredients.find((el) => el.type === "bun"), [dataIngredients]);
  const saucesAndMains = useMemo(() => dataIngredients.filter((el) => el.type !== "bun"), [dataIngredients]);



  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const totalSum = useMemo(
    () =>
      dataIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price, 0),
    [dataIngredients]
  );

  const removeElement = (ingredient) =>{
    console.log(ingredient._id);
  //  setDataIngredients([dataIngredients.filter((el) => el._id !== ingredient._id)])
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}>
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
        {saucesAndMains.map((item, index) => (
          <li className={ burgerConstructorStyle.item } key={index}>
            <DragIcon type="primary" />
            <IngredientsItem ingredient={ item } removeElement={ removeElement }/>
          </li>
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
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
        )
      }
    </div>
  )
}

BurgerConstructor.propTypes ={
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;


