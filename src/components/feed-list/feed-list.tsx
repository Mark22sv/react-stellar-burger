import { FC } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Card } from '../card/card';
import styles from './feed-list.module.css';
import { feed } from "../../utils/constants";
import { FeedListProps } from "../../services/types/data";



export const FeedList: FC<FeedListProps> = ({orders}) => {
  const location = useLocation();


  return (
    <>
    {orders &&
    <ul className={`${styles.container} pr-2`}>
      {orders.map((item, index) => (
        <li key={index}>
          <Link
            className={ styles.link }
            to={{ pathname: `${feed}/${item.number}` }}
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
