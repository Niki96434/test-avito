import './ToggleSwitch.css'

interface ToggleSwitchType {
    isActive: boolean;
    handleClick: () => void;
}

export default function ToggleSwitch({ isActive, handleClick }: ToggleSwitchType) {
    return (
        <div className='container-revision'>
            <div className='lable-switch'>Только требующие <br></br> доработок</div>
            <div className='gui-switch'>
                <input onChange={handleClick} checked={isActive} className='checkbox' type="checkbox" role='switch' />
                <span className='round'></span>
            </div >
        </div>
    )
}