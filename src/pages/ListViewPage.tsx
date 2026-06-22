import './ListViewPage.css';
import { useState } from 'react';
import { FilterState, type SingleItem } from '../entities/card/model/cards.type';
import { useEffect } from 'react';
import HeaderListView from '../entities/card/ui/HeaderListView';
import SearchAd from '../entities/card/ui/SearchAd';
import ViewToggle from '../entities/card/ui/ViewToggle';
import SortForm from '../entities/card/ui/SortForm';
import Checkbox from './../shared/ui/Checkbox';
import ToggleSwitch from '../entities/card/ui/ToggleSwitch';
import ResetFilterBtn from '../entities/card/ui/ResetFilterBtn';
import Card from '../entities/card/ui/Card';
import ListCards from '../entities/card/ui/ListCards';
import { filterItems } from '../entities/card/api/filterItems';

export default function ListView() {

    const [filters, setFilters] = useState<FilterState>({
        category: null,
        needsRevision: false,
        sortColumn: null,
        sortDirection: null,
    });
    const [indexView, setIndexView] = useState<'grid' | 'list'>('grid');
    const [items, setItems] = useState<SingleItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            const filteredItems = await filterItems(filters, inputValue);
            if (filteredItems !== null) {
                setItems(filteredItems);

            } else {
                setItems([]);
            }
        }
        loadData();
    }, [filters, inputValue]);

    const resetFilter = () => {
        setFilters({
            category: null,
            needsRevision: false,
            sortColumn: null,
            sortDirection: null,
        });
    }
    return (
        <div className='search-and-filter-wrapper'>
            <HeaderListView totalItems={items.length} />
            <div className='search-sort-container'>
                <SearchAd handleInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
                <ViewToggle handleView={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (value === 'grid' || value === 'list') {
                        setIndexView(value)
                    }
                }} />
                <SortForm handleValue={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    switch (e.target.value) {
                        case 'new':
                            setFilters((prev) => ({ ...prev, sortColumn: 'createdAt', sortDirection: 'asc' }));
                            break;
                        case 'old':
                            setFilters((prev) => ({ ...prev, sortColumn: 'createdAt', sortDirection: 'desc' }));
                            break;
                        case 'nameZ-A':
                            setFilters((prev) => ({ ...prev, sortColumn: 'title', sortDirection: 'desc' }));
                            break;
                        case 'nameA-Z':
                            setFilters((prev) => ({ ...prev, sortColumn: 'title', sortDirection: 'asc' }));
                            break;
                    }
                }} />
            </div>
            <div className='container'>
                <div className='filter-and-resetfilter'>
                    <div className="card-filter-container">
                        <h3>Фильтры</h3>
                        <div className='category-padding'>
                            <span>Категория</span>
                            <div className='flex-checkbox'>
                                <Checkbox handleInput={() => setFilters((prev) => ({ ...prev, category: 'auto' }))} >Авто</Checkbox>
                                <Checkbox handleInput={() => setFilters((prev) => ({ ...prev, category: 'electronics' }))}>Электроника</Checkbox>
                                <Checkbox handleInput={() => setFilters((prev) => ({ ...prev, category: 'real_estate' }))}>Недвижимость</Checkbox>
                            </div>
                        </div>
                        <hr />
                        <ToggleSwitch isActive={filters.needsRevision} handleClick={() => setFilters((prev) => ({ ...prev, needsRevision: !prev.needsRevision }))} />
                    </div>
                    <ResetFilterBtn resetFilter={() => resetFilter()} />
                </div>
                <div className='overflow-scroll'>
                    <div className={indexView === 'grid' ? 'grid-cards' : 'list-cards'}>
                        <ListCards data={items} renderItem={((item: SingleItem) => <Card key={item.id} item={item} variant={indexView} />)} />
                    </div>
                </div>
            </div>
        </div >
    )
}