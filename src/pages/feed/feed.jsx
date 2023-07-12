import { useEffect } from "react";
import styles from "./feed.module.css"
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ORDERS_FEED_URL } from '../../utils/constants';
import { getSelectorOrdersFeed } from '../../utils/get-selector';
import { connect, disconnect } from '../../services/actions/ws';
import { FeedList } from "../../components/feed-list/feed-list";
import { StatisticsOrder } from "../../components/statistics-orders/statistics-orders";

export function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(getSelectorOrdersFeed, shallowEqual);

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


