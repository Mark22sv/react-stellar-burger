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
import { DataContext, OrderContext } from '../services/IngredientsContext';
import { setOrderFetch } from "../../api/api";

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
  const { data, setData } = useContext(DataContext);
  const { orderState, orderDispatcher } = useContext(OrderContext);

  // const bunApiData = useMemo(() => data.find((el) => el.type === "bun"), [data]);
  // const saucesAndMainsApiData = useMemo(() => data.filter((el) => el.type !== "bun"), [data]);

  // //const startIngredient = [...bunApiData, ...saucesAndMainsApiData];
  // //console.log(startIngredient)
  // useEffect(() => {
  //   orderDispatcher({type: "setIngedients", payload: startIngredient});
  // }, []);

  const bun = useMemo(() => orderState.orderIngredients.find((el) => el.type === "bun"),
                      [orderState.orderIngredients]);
  const saucesAndMains = useMemo(() => orderState.orderIngredients.filter((el) => el.type !== "bun"),
                      [orderState.orderIngredients]);

  const [isOpen, setIsOpen] = useState(false);


  const [orderNumber, setOrderNumber] = useState();

  const setOrder = (order) => {
    setOrderFetch(order)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleOpenModal = () => {
    let order = {
      ingredients: []
    };
    for (let i = 0; i < orderState.orderIngredients.length; i++){
      order = {ingredients: [...order.ingredients, orderState.orderIngredients[i]._id]};
    }
    setOrder(order);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const totalSum = useMemo(
    () => {
      let bun, priceBun;
      if (orderState.orderIngredients.find((el) => el.type === "bun")){
        bun = orderState.orderIngredients.find((el) => el.type === "bun");
        priceBun = bun.price;
      } else priceBun = 0;
      return priceBun + orderState.orderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
    },
    [orderState.orderIngredients]

  );

  const removeIngredient = (ingredient) =>{
    const newOrderIngredients = orderState.orderIngredients.filter((el) => el._id !== ingredient._id);
    orderDispatcher({type: "removeIngredient", payload: newOrderIngredients});
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
            <IngredientsItem ingredient={ item } removeElement={ removeIngredient }/>
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
          <OrderDetails orderNumber={ orderNumber }/>
        </Modal>
        )
      }
    </div>
  )
}



export default BurgerConstructor;


