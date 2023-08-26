import { useEffect } from "react";
import styles from "./feed.module.css"
import { shallowEqual } from 'react-redux';
import { ORDERS_FEED_URL } from '../../utils/constants';
import { connect, disconnect } from '../../services/actions/ws';
import { FeedList } from "../../components/feed-list/feed-list";
import { StatisticsOrder } from "../../components/statistics-orders/statistics-orders";
import { useAppDispatch, useAppSelector } from "../../services";

export function Feed() {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((store) => store.ordersFeed, shallowEqual);

  useEffect(() => {
    dispatch(connect(ORDERS_FEED_URL));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large pt-6` }>Лента заказов</h2>
      <div className={ styles.main }>
        <section className={ styles.section }>
          <FeedList orders={orders} />
        </section>
        <section className={ styles.section }>
          <StatisticsOrder orders={orders} total={total} totalToday={totalToday} />
        </section>
      </div>

    </>

  );
}


