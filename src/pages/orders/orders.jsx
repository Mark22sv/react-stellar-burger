import { useEffect } from "react";
import styles from "./orders.module.css"
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ORDERS_USER_URL } from '../../utils/constants';
import { getSelectorOrdersFeed } from '../../utils/get-selector';
import { connect, disconnect } from '../../services/actions/ws';
import { OrdersList } from "../../components/orders-list/orders-list";
import { ProfileNavBar } from '../../components/profile-navbar/profile-navbar';
import cloneDeep from 'lodash.clonedeep';



export function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(getSelectorOrdersFeed, shallowEqual);
  const ordersList = cloneDeep(orders);
  const accessToken = localStorage.getItem('accessToken').replace("Bearer ","");

  useEffect(() => {
    dispatch(connect(`${ORDERS_USER_URL}?token=${accessToken}`));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={ styles.main }>
      <ProfileNavBar />
      <section className={ styles.section }>
        <OrdersList orders={ordersList.reverse()} />
      </section>
    </div>
  );
}
