
import { FC } from "react";
import { shallowEqual } from 'react-redux';
import styles from './card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, OrderDataContainer } from '../../services/types/data';
import { useAppSelector } from "../../services";

export const Card: FC<OrderDataContainer> = ({order}) => {
  const { data } = useAppSelector((state) => state.dataIngredients, shallowEqual);
  const { number, createdAt, name, ingredients, status } = order;


  const findIngredient = (ingredient: string) => {
    return data.find((item: Ingredient) => item._id === ingredient)
  };
  const lastIngredient = findIngredient(ingredients[5]);
  const numbersHidden = ingredients.length === 6 ? '' : `+${ingredients.length - 6}`;

  const totalSum = (id: string[]) => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    id.forEach((ingredient) => {
      const check = data.find((item: Ingredient) => item._id === ingredient);
      if (check?.price) {
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
          <FormattedDate
            date={new Date(createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
      </div>
        <h3 className={`${styles.name} text text_type_main-medium pt-6`}>{name}</h3>
        {!!status && <p className={'text text_type_main-default pt-2 pb-6'}>{status === 'done' ? 'Выполнен'
        : status === 'pending' ? 'Готовится'
        : status === 'created' ? 'Создан' : 'Выполнен' }</p>}
      <div className={styles.box_container}>
        <ul className={`${styles.box}`}>
          {ingredients.map((item, index) =>
            {const selectedIngredient = findIngredient(item)
              if (index < 5)
                return (
                  <li key={index} className={styles.ingredient}>
                    <img  className={styles.image} src={selectedIngredient?.image}
                    alt={selectedIngredient?.name} />
                  </li>
                )
            })
          }
          {lastIngredient && (
              <li key={lastIngredient._id} className={styles.ingredient}>
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



