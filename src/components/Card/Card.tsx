import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { CustomInput } from "../CustomInput/CustomInput";
import './Card.css'
import { ColumnsDispatchContext } from "../../shared/columns-context";
import { useContext } from "react";
import { ColumnActionsType } from "../../shared/column-actions";

interface CardProps {
  id: string,
  text: string,
  placeholder?: string,
}

export const Card = ({id, text, placeholder}: CardProps) => {  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id})
  const dispatch = useContext(ColumnsDispatchContext)


  const onEditCard = (id: string, text: string) => {
    dispatch({
      type: ColumnActionsType.EDIT_CARD,
      payload: {
        id: id,
        text: text
      },
    });

  }

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
        cardId={id}
        text={text}
        placeholder={placeholder}
        onChange={onEditCard}
      />
      <button className={`dragger`} {...listeners} {...attributes}></button>

    </div>
  )
}
