import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

export default function FeaturedProducts() {
    return (
        <section className='fetured-categories'>
            <article className='item1'>
                <div className='img-container'>
                    <Link to='#'>
                        <p className='category-title'>
                            Интериорни врати Variodor
                        </p>
                        <img
                            src='https://blindoorltd.com/wp-content/uploads/2021/12/variodor-Custom.jpg'
                            alt='variodor'
                            className='category-img'
                        />
                    </Link>
                </div>
            </article>
            <article className='item2'>
                <div className='img-container'>
                    <Link to='#'>
                        <p className='category-title'>Входни врати Haska</p>
                        <img
                            src='https://blindoorltd.com/wp-content/uploads/2021/12/haska-Custom.jpg'
                            alt='variodor'
                            className='category-img'
                        />
                    </Link>
                </div>
            </article>
            <article className='item3'>
                <div className='img-container'>
                    <Link to='#'>
                        <p className='category-title'>
                            Входни врати Star Security Door
                        </p>
                        <img
                            src='https://blindoorltd.com/wp-content/uploads/2021/12/std-Custom.jpg'
                            alt='variodor'
                            className='category-img'
                        />
                    </Link>
                </div>
            </article>
            <article className='item4'>
                <div className='img-container'>
                    <Link to='#'>
                        <p className='category-title'>
                            Интериорни врати New Style Doors
                        </p>
                        <img
                            src='https://blindoorltd.com/wp-content/uploads/2021/12/eurostill-Custom.png'
                            alt='variodor'
                            className='category-img'
                        />
                    </Link>
                </div>
            </article>
        </section>
    );
}
