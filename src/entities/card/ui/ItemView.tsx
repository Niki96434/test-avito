import { SingleItem } from "../model/cards.type";
import warningIcon from '../../../assets/warning.svg';
import cover from '../../../assets/Фотки.svg';
import { useMemo, useState } from "react";
import './ItemView.css';
import CardEditForm from "./CardEditForm";

interface itemProps {
    data: SingleItem;
}

export default function ItemView({ data }: itemProps) {

    const currentRevision = useMemo(() => {
        const missingFields: React.ReactNode[] = [];

        if (!data.description || data.description.trim() === '') {
            missingFields.push(<li key="desc">Описание</li>);
        }
        if (!data.price) {
            missingFields.push(<li key="price">Цена</li>);
        }
        const p = data.params;
        if (data.category === 'auto') {
            if (!p.brand) missingFields.push(<li key="brand">Марка</li>);
            if (!p.model) missingFields.push(<li key="model">Модель</li>);
            if (!p.yearOfManufacture) missingFields.push(<li key="year">Год выпуска</li>);
        }
        else if (data.category === 'real_estate') {
            if (!p.address) missingFields.push(<li key="address">Адрес</li>);
            if (!p.area) missingFields.push(<li key="area">Площадь</li>);
        }
        else if (data.category === 'electronics') {
            if (!p.brand) missingFields.push(<li key="brand">Бренд</li>);
        }

        return missingFields;
    }, [data]);

    const [modalActive, setModalActive] = useState(false);

    const contentRevision =
        data.needsRevision ? (
            <div className="warning-container">
                <div className="revision-container">
                    <img className='img-warning' src={warningIcon} />
                    <p className="revision-title">Требуются доработки</p>
                </div>
                <p>У объявления не заполнены поля: </p>
                <ul>
                    {currentRevision}
                </ul>
            </div>) : null;

    const date = new Date(data.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });

    const contentCharacteristics = () => {
        const param = data.params;
        if (data.category === 'electronics') {
            return (
                <div className="characteristics">
                    <h3>Характеристики</h3>
                    {param.type && <p>Тип&nbsp;&nbsp;&nbsp;{param.type === 'phone' ? 'Смартфон' : param.type === 'misc' ? 'Прочее' : null}</p>}
                    {param.brand && <p>Бренд&nbsp;&nbsp;&nbsp;{param.brand}</p>}
                    {param.model && <p>Модель&nbsp;&nbsp;&nbsp;{param.model}</p>}
                    {param.condition && <p>Состояние&nbsp;&nbsp;&nbsp;{param.condition === 'new' ? 'Новое' : 'Б/У'}</p>}
                    {param.color && <p>Цвет&nbsp;&nbsp;&nbsp;{param.color}</p>}
                </div>);
        } else if (data.category === 'real_estate') {
            return (
                <div className="characteristics">
                    <h3>Характеристики</h3>
                    <p>Тип&nbsp;&nbsp;&nbsp;{param.type === 'flat' ? 'Квартира' : param.type === 'house' ? 'Дом' : param.type === 'room' ? 'Комната' : param.type}</p>
                    <p>Адрес&nbsp;&nbsp;&nbsp;{param.address}</p>
                    {param.area && <p>Площадь&nbsp;&nbsp;&nbsp;{param.area} м²</p>}
                    {param.floor !== undefined && <p>Этаж&nbsp;&nbsp;&nbsp;{param.floor}</p>}
                </div>);
        } else if (data.category === 'auto') {
            return (
                <div className="characteristics">
                    <h3>Характеристики</h3>
                    {param.brand && <p>Марка&nbsp;&nbsp;&nbsp;{param.brand}</p>}
                    {param.model && <p>Модель&nbsp;&nbsp;&nbsp;{param.model}</p>}
                    <p>Год выпуска {param.yearOfManufacture}</p>
                    {param.transmission && <p>Коробка&nbsp;&nbsp;&nbsp;{param.transmission === 'automatic' ? 'Автомат' : 'Механика'}</p>}
                    {param.mileage && <p>Пробег&nbsp;&nbsp;&nbsp;{param.mileage} км</p>}
                    {param.enginePower && <p>Мощность&nbsp;&nbsp;&nbsp;{param.enginePower} л.с.</p>}
                </div>
            );
        } else {
            return <div>Нет характеристик</div>
        }
    }

    return (
        <>
            <div className="item-view-page">
                <div className="header-item">
                    <div className="title-item">
                        <h1>{data.title}</h1>
                        <h1>{data.price} ₽</h1>
                    </div>
                    <div className="edit-and-created-at">
                        <button className="btn-edit" onClick={() => setModalActive(true)}>
                            Редактировать
                            <span className="icon-pencil"></span>
                        </button>
                        <div className="created-at">
                            <p>Опубликовано: {date}</p>
                        </div>
                    </div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '20px 32px' }} />
                <div className="item-view">
                    <div className="ads-description">
                        <div className="item-view-descr">
                            <img className='img-cover' src={cover} />
                            <div className="description-items">
                                <h3>Описание</h3>
                                <br />
                                <p>{data.description ? data.description : null}</p>
                            </div>
                        </div>
                        <div className="revision-and-characteristics">
                            {contentRevision}
                            {contentCharacteristics()}
                        </div>
                    </div>
                </div>
            </div>
            {modalActive && <CardEditForm id={data.id} handleModal={() => setModalActive(false)} />}
        </>
    )
}