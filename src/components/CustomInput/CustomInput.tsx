import { useRef, useEffect } from "react";
import './CustomInput.css'

interface CustomInputProps {
    id: string,
    text: string,
    placeholder?: string,
    onChange: Function
}

export const CustomInput = ({ id, text, placeholder, onChange }: CustomInputProps) => {
    const ENTER = "Enter"
    const ESCAPE = "Escape"
    
    const inputRef: React.Ref<any> = useRef(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, []); // Empty dependency array means this runs only once on mount

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ENTER || event.key === ESCAPE) {
            inputRef.current?.blur()
        }
    }

    return (
        <input
            ref={inputRef}
            className="card-text-input"
            type="text"
            value={text}
            placeholder={placeholder}
            onChange={(event) => { onChange(id, event.target.value) }}
            onKeyDown={(event) => { onKeyDown(event) }}
        />
    )
}