import React, { ChangeEvent, useEffect, useState } from "react";
import './CardEditForm.css';
import { SingleItem } from "../model/cards.type";
import { getItem } from "../api/getItem";
import { editItem } from "../api/editItem";
import { ItemUpdateIn, AutoItemParams, RealEstateItemParams, ElectronicsItemParams } from "../model/cards.type";
import { getAiHelp } from "../api/gemini";
import HintButton from "../../../shared/ui/HintButton";

interface CardEditFormProps {
    id: number;
    handleModal: () => void;
}

export default function CardEditForm({ id, handleModal }: CardEditFormProps) {
    const [item, setItem] = useState<SingleItem | null>(null);
    const [category, setCategory] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        type: '',
        brand: '',
        model: '',
        yearOfManufacture: '',
        address: '',
        area: '',
        floor: '',
        condition: 'new'
    });

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const data = await getItem(id);
                if (data !== null) {
                    setItem(data);
                    setCategory(data.category);
                    setIsLoading(false);
                    setFormData({
                        title: data.title,
                        price: data.price.toString(),
                        description: data.description || '',
                        brand: data.params?.brand || '',
                        model: data.params?.model || '',
                        yearOfManufacture: data.params?.yearOfManufacture?.toString() || '',
                        address: data.params?.address || '',
                        area: data.params?.area?.toString() || '',
                        floor: data.params?.floor?.toString() || '',
                        condition: data.params?.condition || 'new',
                        type: data.params?.type || ''
                    });
                } else {
                    setItem(null);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        loadData();
    }, [id]);

    const renderType = (category: string) => {
        if (!item) return null;
        switch (category) {
            case 'auto':
                return <option value='auto'>Авто</option>;
            case 'real_estate':
                return (
                    <>
                        <option value="flat">Квартира</option>
                        <option value="house">Дом</option>
                        <option value="room">Комната</option>
                    </>
                );
            case 'electronics':
                return (
                    <>
                        <option value="phone">Смартфон</option>
                        <option value="misc">Прочее</option>
                    </>
                );
            default:
                return null;
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const renderCategoryParams = (category: string) => {
        if (!item) return null;
        switch (category) {
            case 'auto':
                return (
                    <>
                        <h5>Марка</h5>
                        <input name="brand" className="input-style" onChange={handleInputChange} value={formData.brand} placeholder="Mitsubishi" />
                        <h5>Модель</h5>
                        <input name="model" className="input-style" onChange={handleInputChange} value={formData.model} placeholder="Lancer" />
                        <h5>Год выпуска</h5>
                        <input name="year" className="input-style" type="number" onChange={handleInputChange} value={formData.yearOfManufacture} />
                    </>
                );
            case 'real_estate':
                return (
                    <>
                        <h5>Адрес</h5>
                        <input name="address" className="input-style" onChange={handleInputChange} value={formData.address} placeholder="г. Москва..." />
                        <h5>Площадь (м²)</h5>
                        <input name="area" className="input-style" type="number" step="0.1" onChange={handleInputChange} value={formData.area} />
                        <h5>Этаж</h5>
                        <input name="floor" className="input-style" type="number" onChange={handleInputChange} value={formData.floor} />
                    </>
                );
            case 'electronics':
                return (
                    <>
                        <h5>Бренд</h5>
                        <input name="brand" className="input-style" onChange={handleInputChange} value={formData.brand} placeholder="Apple" />
                        <h5>Состояние</h5>
                        <select name="condition" onChange={handleInputChange} value={formData.condition} >
                            <option value="new">Новое</option>
                            <option value="used">Б/У</option>
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const baseData = {
            id: Number(item?.id),
            title: String(formData.title),
            category: category as 'auto' | 'real_estate' | 'electronics',
            price: Number(formData.price),
            description: String(formData.description || ''),
        };

        let params: ItemUpdateIn | AutoItemParams | RealEstateItemParams | ElectronicsItemParams = {};
        if (category === 'auto') {
            params = {
                brand: String(formData.brand),
                model: String(formData.model),
                yearOfManufacture: Number(formData.yearOfManufacture),
            };
        } else if (category === 'real_estate') {
            params = {
                type: formData.type as "flat" | "house" | "room" | undefined,
                address: String(formData.address),
                area: Number(formData.area),
                floor: Number(formData.floor),
            };
        } else if (category === 'electronics') {
            params = {
                type: formData.type as "phone" | "misc" | undefined,
                brand: String(formData.brand),
                condition: formData.condition as "new" | "used" | undefined,
            };
        }

        try {
            await editItem(id, { ...baseData, params });
            handleModal();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSuggestPrice = async () => {
        try {
            setIsAiLoading(true);
            const aiPrice = await getAiHelp('price', { title: formData.title, category });
            setFormData(prev => ({ ...prev, price: aiPrice.replace(/\D/g, "") }));
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleImproveDescription = async () => {
        try {
            setIsAiLoading(true);
            const newText = await getAiHelp('description', {
                title: formData.title,
                category,
                description: formData.description
            });
            setFormData(prev => ({ ...prev, description: newText.trim() }));
        } finally {
            setIsAiLoading(false);
        }
    };

    if (isLoading) return <div className="modal">Загрузка...</div>;
    if (!item) return <div className="modal">Объявление не найдено</div>;

    return (
        <div className="modal" onClick={handleModal}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h1>Редактирование объявления</h1>
                    <div>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} name='category'>
                            <option value='electronics'>Электроника</option>
                            <option value='auto'>Авто</option>
                            <option value='real_estate'>Недвижимость</option>
                        </select>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0' }} />
                    <div>
                        <h4>Название</h4>
                        <input name='title' className="input-style" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0' }} />
                    <h4>Цена</h4>
                    <div className="price-flex">
                        <input name='price' className="input-style" type='number' value={formData.price} onChange={handleInputChange} />
                        <HintButton onClick={handleSuggestPrice}>
                            {isAiLoading ? "..." : "Узнать рыночную цену"}
                        </HintButton>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0' }} />
                    <div className="params">
                        <h4>Характеристики</h4>
                        <h5>Тип</h5>
                        <select name='type'>{renderType(category)}</select>
                        {renderCategoryParams(category)}
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0' }} />
                    <h4>Описание</h4>
                    <div className="description-item">
                        <textarea className="textarea-style" name='description' value={formData.description} onChange={handleInputChange} />
                        <HintButton onClick={handleImproveDescription}>
                            {isAiLoading ? "..." : formData.description.trim() === '' ? "Придумать описание" : "Улучшить описание"}
                        </HintButton>
                    </div>
                    <div className="btn-list">
                        <button className="btn-save" type="submit">Сохранить</button>
                        <button className="btn-cancel" type="button" onClick={handleModal}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

