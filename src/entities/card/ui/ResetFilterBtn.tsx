import './ResetFilterBtn.css';

interface ResetFilterType { resetFilter: () => void };

export default function ResetFilterBtn({ resetFilter }: ResetFilterType) {
    return <button onClick={resetFilter} className="container-btn">Сбросить фильтры</button>
}