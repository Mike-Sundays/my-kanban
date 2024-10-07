import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { CustomInput } from "../CustomInput/CustomInput";
import './Card.css'

interface CardProps {
  id: string,
  text: string,
  placeholder?: string,
  onEditCard: Function
}

export const Card = ({id, text, placeholder, onEditCard}: CardProps) => {  
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


  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card`}
      key={id}
      id={id}
    >
      <CustomInput
        id={id}
        text={text}
        placeholder={placeholder}
        onChange={onEditCard}
      />
      <button className={`dragger`} {...listeners} {...attributes}></button>

    </div>
  )
}
