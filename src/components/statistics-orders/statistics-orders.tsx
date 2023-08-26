import { FeedOrders } from '../../services/types/data';
import styles from './statistics-orders.module.css';
import {  FC } from "react";

export const StatisticsOrder: FC<FeedOrders> = ({ orders, total, totalToday }) => {

  const ordersDone = orders && orders.filter((item) => item.status === 'done').slice(0, 20);
  const ordersWork = orders && orders.filter((item) => item.status === 'pending').slice(0, 10);

  return (
    <>
    {ordersDone && ordersWork &&
    <div className={styles.info}>
      <div className={styles.orders}>
        <div className={styles.column}>
          <h3 className='text text_type_main-medium pb-1'>Готовы:</h3>
          <ul className={styles.list}>
            {ordersDone.map((item, index)=>(
              <li key={index} className={`${styles.numberOrderDone} text text_type_digits-default`}>{item.number}</li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className='text text_type_main-medium  pb-1'>В работе:</h3>
          <ul className={styles.list}>
            {orders && ordersWork?.map((item, index)=>(
              <li key={index} className={`${styles.numberOrderWork} text text_type_digits-default`}>{item.number}</li>
            ))}
          </ul>
        </div>
      </div>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <span className={`${styles.points} text text_type_digits-large`}>{total}</span>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <span className={`${styles.points} text text_type_digits-large`}>{totalToday}</span>
    </div>
    }
  </>
  )
};

