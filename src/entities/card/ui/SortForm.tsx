import './SortForm.css'
interface SortFormType {
    handleValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SortForm({ handleValue }: SortFormType) {

    return (
        <form>
            <div className='sort-form-wrapper' >
                <select className='sort-form'
                    name="sort"
                    onChange={handleValue}
                >
                    <option selected disabled>Сортировать</option>
                    <option value='new'>По новизне (сначала новые)</option>
                    <option value='old'>По новизне (сначала старые)</option>
                    <option value='nameZ-A'>По названию(Я → А)</option>
                    <option value='nameA-Z'>По названию(А → Я)</option>
                    <option value='cheap'>По цене (сначала дешевле)</option>
                    <option value='expensive'>По цене (сначала дороже)</option>
                </select>
            </div>
        </form>
    )
}

