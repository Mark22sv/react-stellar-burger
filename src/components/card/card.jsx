import { useSelector, shallowEqual } from 'react-redux';
import { getSelectorDataIngredients } from '../../utils/get-selector';
import styles from './card.module.css';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function Card({order}) {
  const { data } = useSelector(getSelectorDataIngredients, shallowEqual);
  const { number, createdAt, name, ingredients } = order;


  const findIngredient = (ingredient) => {
    return data.find(item => item._id === ingredient)
  };
  const lastIngredient = findIngredient(ingredients[5]);
  const numbersHidden = ingredients.length === 6 ? '' : `+${ingredients.length - 6}`;

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
    {order &&
    <div className={`${styles.container} p-6`}>

      <div className={styles.header}>
          <p className='text text_type_digits-default'>#{number}</p>
          <p className='text text_type_main-default text_color_inactive'>{determineDate(createdAt)}</p>
        </div>
        <h3 className={`${styles.name} text text_type_main-medium pt-6`}>{name}</h3>
      <div className={styles.box_container}>
        <ul className={`${styles.box}`}>
          {ingredients.map((item, index) =>
            {const selectedIngredient = findIngredient(item)
              if (index < 5)
                return (
                  <li key={uuidv4()} className={styles.ingredient}>
                    <img  className={styles.image} src={selectedIngredient?.image}
                    alt={selectedIngredient.name} />
                  </li>
                )
            })
          }
          {lastIngredient && (
              <li key={uuidv4()} className={styles.ingredient}>
                <img className={styles.lastIngredient} src={lastIngredient?.image}
                  alt={lastIngredient.name} />
                <p className={`${styles.count} text text_type_main-default`}>{`${numbersHidden}`}</p>
              </li>
              )
            }
        </ul>
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



