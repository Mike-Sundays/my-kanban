import { Board } from "./components/Board/Board.tsx";
import './App.css'
function App() {
  localStorage.clear()
  return (
      <Board />
  );
}

export default App;
