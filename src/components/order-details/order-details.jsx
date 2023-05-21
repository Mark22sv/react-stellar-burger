import orderDetails from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = ( { orderNumber } ) => {
  return (
    <ul className={`${ orderDetails.container } pt-9`}>
      <li>
        <p className={`${ orderDetails.number } text text_type_digits-large`}>
          { orderNumber }
        </p>
      </li>
      <li>
        <p className={`${ orderDetails.text } text text_type_main-medium pt-8 pb-15`}>
          идентификатор заказа
        </p>
      </li>
      <li>
        <div className={ orderDetails.done} ></div>
      </li>
      <p className={`${ orderDetails.text } text text_type_main-default pt-15`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${ orderDetails.text } text text_type_main-default text_color_inactive pt-2 pb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </ul>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;
