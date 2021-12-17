import { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';

import { Col, Row, Spinner, Alert } from '../../react-bootstrap';
import { getAllDoors } from '../../firebase';
import CatalogSidebar from '../CatalogSidebar/CatalogSidebar';
import ProductItemList from '../ProductItemList';

export default function Catalog() {
    const [allDoors, setAllDoors] = useState([]);
    const [filteredDoors, setFilteredDoors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nothingFound, setNothingFound] = useState(false);

    const query = useQuery();

    useEffect(() => {
        setLoading(true);
        getAllDoors().then(doors => {
            const manufacturer = query.get('manufacturer');

            if (manufacturer) {
                filterItems({ manufacturer }, doors);
            }

            setLoading(false);
            setAllDoors(doors);
        });
    }, []);

    function filterItems(criteria, initialItems) {
        let doors;
        if (initialItems) {
            doors = initialItems;
        } else {
            doors = allDoors.slice();
        }

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

        if (doors.length === 0) {
            setNothingFound(true);
        } else {
            setNothingFound(false);
        }

        setFilteredDoors(doors);
    }

    return (
        <>
            <Row sm={1}>
                <Col md={4}>
                    <CatalogSidebar filterItems={filterItems} />
                    {nothingFound && (
                        <Alert variant='danger'>
                            Не бяха открити продукти, отговарящи на зададените
                            критерии!
                        </Alert>
                    )}
                </Col>
                <Col md={8}>
                    {loading ? (
                        <Spinner animation='border' className='spinner' />
                    ) : (
                        <>
                            <ProductItemList
                                items={
                                    filteredDoors.length > 0
                                        ? filteredDoors
                                        : allDoors
                                }
                            />
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
}
