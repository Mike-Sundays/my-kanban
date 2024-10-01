import { useRef, useEffect } from "react";

export const CustomInput = ({ id, text, placeholder, onChange }) => {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus();
    }, []); // Empty dependency array means this runs only once on mount

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            inputRef.current.blur()
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