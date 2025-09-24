import { ToastContainer } from "react-toastify";
import { FormProvider } from "./src/components/context/FromContext";
import TodoContainer from "./src/components/todo/todoContainer"
import { Tooltip as ReactTooltip } from "react-tooltip";

function App() {
  
  return (
    <>
  
    <FormProvider>
      <TodoContainer/>
    </FormProvider>
     <ToastContainer/>
     <ReactTooltip id="global-tooltip" place="bottom" variant="dark"/>
    </>
  )
}

export default App
