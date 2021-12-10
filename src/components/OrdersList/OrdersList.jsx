import './OrderList.css';

export default function OrdersList({ orders }) {
    return orders.map(order => (
        <section className='order-container'>
            <section className='order-products-container'>
                {order.products.map(product => (
                    <article className='order-item'>
                        <img src={product.imageUrl} alt={product.title} />
                        <p>{product.title}</p>
                        <p>{product.price} лв.</p>
                    </article>
                ))}
            </section>

            <section className='order-details-container'>
                <p className='order-shipping-address'>
                    Адрес за доставка:
                    <span>{order.shippingDetails.address}</span>
                </p>
                <p className='receiver-details'>
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
