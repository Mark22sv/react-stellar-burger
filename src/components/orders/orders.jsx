import { Link, useLocation } from 'react-router-dom';
import { Card } from '../card/card';
import styles from './orders.module.css';



export function Orders({orders}) {
  const location = useLocation();

  return (
    <>
    {orders &&
    <ul className={`${styles.container} pr-2`}>
      {orders.map((item, index) => (
        <li key={index}>
          <Link
            className={ styles.link }
            to={{ pathname: `/feed/${item._id}` }}
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
