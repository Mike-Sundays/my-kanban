import './App.css'
import {Board} from "./components/Board.tsx";
import {closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable";


function App() {


    return (
            <Board/>
    )
}

export default App
