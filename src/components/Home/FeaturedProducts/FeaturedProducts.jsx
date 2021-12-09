import { useEffect, useState } from 'react';
import { getLatestDoors } from '../../../firebase';
import ProductItem from '../../ProductItem';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getLatestDoors(4).then(setItems);
    }, []);

    return (
        <section className={styles['featured-products']}>
            {items.map(item => (
                <ProductItem key={item.id} item={item} />
            ))}
        </section>
    );
}
