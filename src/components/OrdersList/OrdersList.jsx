import styles from './OrderList.module.css';

export default function OrdersList({ orders }) {
    return orders.map(order => (
        <section className={styles['order-container']}>
            <section className={styles['order-products-container']}>
                {order.products.map(product => (
                    <article className={styles['order-item']}>
                        <img src={product.imageUrl} alt={product.title} />
                        <p>{product.title}</p>
                        <p>{product.price} лв.</p>
                    </article>
                ))}
            </section>

            <section className={styles['order-details-container']}>
                <p className={styles['order-shipping-address']}>
                    Адрес за доставка:
                    <span>{order.shippingDetails.address}</span>
                </p>
                <p className={styles['receiver-details']}>
                    Получател:
                    <span>
                        {order.shippingDetails.firstName +
                            ' ' +
                            order.shippingDetails.lastName}
                    </span>
                    , телефон за връзка:
                    <span>{order.shippingDetails.phone}</span>
                </p>
            </section>
        </section>
    ));
}
