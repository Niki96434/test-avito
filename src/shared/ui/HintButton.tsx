import './HintButton.css';
interface HintButtonProps {
    children: string;
    onClick: () => void;
}

export default function HintButton({ children, onClick }: HintButtonProps) {
    return (
        <button className="hint-btn" onClick={onClick}>{children}</button>
    )
}