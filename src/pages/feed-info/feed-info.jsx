import { OrderInfo } from '../../components/order-info/order-info';
import styles from './feed-info.module.css'


export const FeedInfoPage = () => {
  return (
    <div className={styles.container}>
        <OrderInfo />
    </div>
  )
}
