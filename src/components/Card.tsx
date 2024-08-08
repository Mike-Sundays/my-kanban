import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export const Card = ({id, title}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`card`}
            key={id}
            id={id}
        >
                {title}
        </div>
    )
}
