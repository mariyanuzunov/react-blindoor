import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAllDoors } from '../../firebase';
import CatalogSidebar from '../CatalogSidebar/CatalogSidebar';
import ProductItemList from '../ProductItemList';

// TODO: refactor
export default function Catalog() {
    const [allDoors, setAllDoors] = useState([]);
    const [filteredDoors, setFilteredDoors] = useState([]);

    useEffect(() => {
        getAllDoors().then(doors => {
            setAllDoors(doors);
        });
    }, []);

    function filterItems(criteria) {
        let doors = allDoors.slice();

        if (criteria?.category) {
            doors = doors.filter(x => x.category === criteria?.category);
        }

        if (criteria?.manufacturer) {
            doors = doors.filter(
                x => x.manufacturer === criteria?.manufacturer
            );
        }

        if (criteria?.minPrice) {
            doors = doors.filter(
                x => Number(x.price) >= Number(criteria.minPrice)
            );
        }
        if (criteria?.maxPrice) {
            doors = doors.filter(
                x => Number(x.price) <= Number(criteria.maxPrice)
            );
        }

        if (criteria?.keyword) {
            doors = doors.filter(x =>
                x.title.toLowerCase().includes(criteria.keyword.toLowerCase())
            );
        }

        setFilteredDoors(doors);
    }

    return (
        <>
            <Row sm={1}>
                <Col md={4}>
                    <CatalogSidebar filterItems={filterItems} />
                </Col>
                <Col md={8}>
                    <ProductItemList
                        items={
                            filteredDoors.length > 0 ? filteredDoors : allDoors
                        }
                    />
                </Col>
            </Row>
        </>
    );
}
