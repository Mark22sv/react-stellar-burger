import { OrderInfo } from '../../components/order-info/order-info';
import styles from './order-info.module.css'


export const OrderInfoPage = () => {
  return (
    <div className={styles.container}>
        <OrderInfo />
    </div>
  )
}
