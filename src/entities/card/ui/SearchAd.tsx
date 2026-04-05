import './SearchAd.css'

interface InputValueType {
    handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const handleClick = (e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault();

export default function SearchAd({ handleInputValue }: InputValueType) {
    return (
        <form onSubmit={handleClick} className='container-search'>
            <input onChange={handleInputValue} className='search-input' type="search" placeholder="Найти объявление...." />
            <button type='submit' className="btn-search"></button>
        </form>
    )
}