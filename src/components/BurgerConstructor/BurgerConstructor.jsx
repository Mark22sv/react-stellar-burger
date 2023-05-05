import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from '../BurgerConstructor/BurgerConstructor.module.css';
import { ingredientPropTypes } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const IngredientsItem = ({ ingredient }) => {

  return (
    <div>
      <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
      />
    </div>
  );
}

IngredientsItem.propTypes = {
  ingredient : ingredientPropTypes.isRequired
};

const BurgerConstructor = (props) => {
  console.log(props)
  const buns = useMemo(() => props.ingredients.filter((el) => el.type === "bun"), [props]);
  const saucesAndMains = useMemo(() => props.ingredients.filter((el) => el.type !== "bun"), [props]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true)
  };

  const handleCloseModal = () => {
    setIsOpen(false)
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${buns[0].name} '(верх)'`}
        price={buns[0].price}
        thumbnail={buns[0].image_mobile}
      />
      <ul className={ burgerConstructorStyle.list }>
        {saucesAndMains.map((item, index) => (
          <li className={ burgerConstructorStyle.item } key={index}>
            <DragIcon type="primary" />
            <IngredientsItem ingredient={ item } />
          </li>
          ))
        }
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${buns[0].name} '(низ)'`}
        price={buns[0].price}
        thumbnail={buns[0].image_mobile}
      />
      <div className={`${burgerConstructorStyle.order} pt-10 pr-4`}>
        <div className={`${burgerConstructorStyle.price}`}>
          <p className="text text_type_digits-medium">610</p>
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


BurgerConstructor.propTypes ={
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;


