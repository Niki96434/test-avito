interface CheckboxType {
    children: React.ReactNode;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ children, handleInput }: CheckboxType) {
    return (
        <label htmlFor='category'>{children}
            <input id='category' type="checkbox" onChange={handleInput} />
        </label>
    )
}