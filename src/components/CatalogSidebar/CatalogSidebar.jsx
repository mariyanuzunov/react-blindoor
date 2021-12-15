import FilterProducts from '../FilterProducts';

import styles from './CatalogSidebar.module.css';

export default function CatalogSidebar({ filterItems }) {
    return (
        <div className={styles.sidebar}>
            <FilterProducts filterItems={filterItems} />
        </div>
    );
}
