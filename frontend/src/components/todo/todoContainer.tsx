import { todoList } from '../../config/todoConfig'
import { headerTitle, VARIANT } from '../../helper/enum'
import Button from '../button'
import CreateIcon from '../Icons/createIcon'
import SearchBox from '../searchBox'
import TodoList from './todoList'

const TodoContainer = () => {
  return (
    <>

      <div className="todo-container w-auto min-h-[400px] m-8  rounded shadow border border-gray-300 bg-white">
        <div>
           <div className='w-full pb-4 shadow'>
            <div className="text-gray-600 font-bold text-xl mb-4 flex justify-self-center">{headerTitle.title}</div>

             <div className='flex justify-center'>
              <SearchBox />
              <Button onClick={()=>console.log("cccc")} variant={VARIANT.TEXT}><CreateIcon className="w-6 h-6 text-blue-500 " /></Button>

             </div>
           </div>

          {/* Scrollable todo list */}
          <div className="max-h-[300px] overflow-y-auto  hide-scrollbar">
            {todoList.map((todo: any) => (
              <TodoList
                key={todo.title}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                dueDate={todo.dueDate}
              />
            ))}
          </div>
        </div>
      </div>


    </>
  )
}

export default TodoContainer
