import { Carousel } from '../../react-bootstrap';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';

export default function Home() {
    return (
        <>
            <Carousel variant='dark'>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='https://blindoorltd.com/wp-content/uploads/2021/12/bedroom-Custom.png'
                        alt='bedroom'
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='https://blindoorltd.com/wp-content/uploads/2021/12/kitchen-Custom.png'
                        alt='kitchen1'
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src='https://blindoorltd.com/wp-content/uploads/2021/12/kitchen2-Custom.png'
                        alt='kitchen2'
                    />
                </Carousel.Item>
            </Carousel>
            <FeaturedCategories />
            <FeaturedProducts />
        </>
    );
}
