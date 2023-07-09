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

  const totalSum = (ingredients) => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    ingredients.forEach((ingredient) => {
      const check = data.find((item) => item._id === ingredient._id);
      if (check.price) {
        sum += check.price;
        if (check.type === 'bun') {
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
  <>
    {selectedOrder &&
      <div className={styles.item}>
        <p className={`${styles.header} text text_type_digits-default`}>#{selectedOrder.number}</p>
        <h2 className='text text_type_main-medium pt-10'>{selectedOrder.name}</h2>
        <p className={`${styles.status} text text_type_main-default pt-2`}>
          {selectedOrder.status === 'done' ? 'Выполнен'
          : selectedOrder.status === 'pending' ? 'Готовится'
          : selectedOrder?.status === 'created' ? 'Создан'
          : 'Выполнен' }</p>
        <h3 className={`${styles.details} text text_type_main-medium pt-15`}>Состав:</h3>
        <ul className={styles.list}>
          {
            ingredients.map((ingredient, index) => {
              return (
                <li key={index} className={styles.ingredient}>
                  <img className={styles.ingredientsImage} src={ingredient.image} alt={ingredient.name} />
                  <h4 className={`${styles.name} text text_type_main-default pl-4`}>{ingredient.name}</h4>
                  <div className={`${styles.price} text text_type_digits-default`}>
                    <span>
                      {ingredients && (ingredients.filter(item => (item._id === ingredient._id) && (item.type !== 'bun')).length) === 0 ? 2 :
                        (ingredients.filter(item => (item._id === ingredient._id)).length) }
                    </span>
                    x
                    <p className={styles.details}>
                      {ingredient?.price}<CurrencyIcon type='primary' />
                    </p>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={`${styles.paragraph} text text_type_digits-default`}>
          <p className='text text_type_main-default text_color_inactive'>{determineDate(selectedOrder.createdAt)}</p>
          <div className={`${styles.price} text text_type_digits-default`}>
            {totalSum(ingredients)}
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    }
    </>
  )
};


