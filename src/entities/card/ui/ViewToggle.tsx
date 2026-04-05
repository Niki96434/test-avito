import './ViewToggle.css';

interface ViewToggleType {
    handleView: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ViewToggle({ handleView }: ViewToggleType) {
    return (
        <div className='wrapper-btn-view-toggle'>
            <fieldset className='container-btn-view-toggle'>
                <label htmlFor='grid'>
                    <input onChange={handleView} value='grid' name='view-mode' id='grid' type='radio' className="grid-btn"></input>
                </label>
                <label htmlFor='list'>
                    <input onChange={handleView} value='list' name='view-mode' id='list' type='radio' className="list-btn"></input>
                </label>
            </fieldset>
        </div>
    )
}