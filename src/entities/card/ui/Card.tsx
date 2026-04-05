import './Card.css';
import type { SingleItem } from '../model/cards.type';
import needRevision from '../../../assets/needrevision.svg';
import cover from '../../../assets/cover.svg';
import { Link } from 'react-router-dom';

interface CardProps {
    item: SingleItem;
    variant: 'grid' | 'list';
}


export default function Card({ item, variant }: CardProps) {

    const topStyle = {
        top: variant === 'grid' ? '-15px' : variant === 'list' ? '0px' : undefined
    }

    let categoryName;
    switch (item.category) {
        case 'auto':
            categoryName = 'Авто';
            break
        case 'electronics':
            categoryName = 'Электроника';
            break
        case 'real_estate':
            categoryName = 'Недвижимость'
    }

    return (
        <Link to={`/items/${item.id}`} style={{
            width: variant === 'grid' ? '200px' : '1055px',
            height: variant === 'grid' ? '268px' : '132px',
            display: variant === 'grid' ? 'grid' : 'flex',
            flexDirection: variant === 'list' ? 'row' : undefined
        }} className="container-card">
            <img src={cover}></img>
            <div className='category-and-content' style={topStyle}>
                <div className="category">{categoryName}</div>
                <div className='content'>
                    <div className="title">{item.title}</div>
                    <span className="price">{item.price}р</span>
                    <div className='revision'>
                        {item.needsRevision ? <img src={needRevision} /> : null}
                    </div>
                </div>
            </div>
        </Link >
    )
}
