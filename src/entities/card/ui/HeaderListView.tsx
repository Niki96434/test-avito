import './HeaderListView.css'
export default function HeaderListView({ totalItems }: { totalItems: number }) {
    return (
        <div className="header">
            <p className='title'>Мои объявления</p >
            <p className='total'>{totalItems} объявления</p>
        </div>
    )
}