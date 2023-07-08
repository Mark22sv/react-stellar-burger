import { useSelector, shallowEqual } from "react-redux";
import { getSelectorDataIngredients } from '../../utils/get-selector';
import { useParams } from "react-router-dom";
import { getSelectorOrdersFeed } from '../../utils/get-selector';
import styles from './order-info.module.css';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';



export function OrderInfo() {
  const { orders } = useSelector(getSelectorOrdersFeed, shallowEqual);
  const { data } = useSelector(getSelectorDataIngredients, shallowEqual);
  const { id } = useParams();

  const selectedOrder = orders.find((item) => item._id === id);
  const currentIngredients = selectedOrder.ingredients;
  const ingredients = currentIngredients.map((item) => data.find((ingredient) => ingredient._id ===  item));

  const determineDate = (date) => {
    const relativeDate = formatRelative(new Date(date), new Date(), { locale: ru });
    return relativeDate.split(' в ').join(', ') + ' i-GMT+3'
  }

  const totalSum = (id) => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    id.forEach((ingredient) => {
      const check = data.find((item) => item._id === ingredient);
      if (check?.price) {
        sum += check.price;
        if (check?.type === 'bun') {
          sum += check.price;
          bun = check.price;
          count += 1;
        }
      }
    })
    if (count === 2) {
      sum = sum - 2 * bun
    }
    return sum;
  }


 return (
  <div className={`${styles.container} p-6`}>
  <div className={styles.header}>
      <p className='text text_type_digits-default'>#{selectedOrder.number}</p>
      <p className='text text_type_main-default text_color_inactive'>{determineDate(selectedOrder.createdAt)}</p>
    </div>
    <h3 className={`${styles.name} text text_type_main-medium pt-6`}>{selectedOrder.name}</h3>
  <div className={styles.box_container}>
    <ul className={`${styles.box}`}>
      {ingredients.map((item, index) => {
        <li key={index} className={styles.ingredient}>
          <img  className={styles.image} src={item.image}
                alt={item.name} />
              </li>
      })

      }
    </ul>
    <div className={`${styles.price} text text_type_digits-default`}>
          {totalSum(ingredients)}
          <CurrencyIcon type='primary' />
    </div>
  </div>
</div>
 )
}

