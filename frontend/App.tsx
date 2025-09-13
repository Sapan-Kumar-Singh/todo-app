import TodoContainer from "./src/components/todo/todoContainer"
import { Tooltip as ReactTooltip } from "react-tooltip";

function App() {
  
  return (
    <>
     <TodoContainer/>
     <ReactTooltip id="global-tooltip" place="bottom" variant="dark"/>
    </>
  )
}

export default App
