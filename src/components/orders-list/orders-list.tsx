import { Link, useLocation } from 'react-router-dom';
import { Card } from '../card/card';
import styles from './orders-list.module.css';
import { profieOrders } from "../../utils/constants";
import { FC } from "react";
import { FeedListProps } from '../../services/types/data';


export const OrdersList: FC<FeedListProps> = ({orders}) => {
  const location = useLocation();

  return (
    <>
    {orders &&
    <ul className={`${styles.container} pr-2`}>
      {orders.map((item, index) => (
        <li key={index}>
          <Link
            className={ styles.link }
            to={{ pathname: `${profieOrders}/${item.number}` }}
            state={{ background: location }}
          >
            <Card order={item} />
          </Link>
        </li>
      ))
      }
    </ul>
    }
    </>
  )
};
