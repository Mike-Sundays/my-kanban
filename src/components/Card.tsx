import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useRef, useEffect } from "react";

export const Card = ({id, text, placeholder, onEditCard}) => {
  const inputRef = useRef(null)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  useEffect(() => {
    inputRef.current.focus();  
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card`}
      key={id}
      id={id}
    >
      <input
        ref={inputRef}
        className="card-text-input"
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(event) => {
          onEditCard(id, event.target.value)
        }}
      />
      <button className={`dragger`} {...listeners} {...attributes}></button>

    </div>
  )
}
