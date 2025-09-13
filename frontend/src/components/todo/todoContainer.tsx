import { useMemo, useState } from 'react'
import { createTodoList, todoList } from '../../config/todoConfig'
import { headerTitle, VARIANT } from '../../helper/enum'
import Button from '../button'
import CreateIcon from '../Icons/createIcon'
import SearchBox from '../searchBox'
import TodoList from './todoList'
import AsideMenu from '../asideMenu'
import FormGroup from '../formGroup/formGroup'

const TodoContainer = () => {
    const[showMenu,setShowMenu]=useState(false);
    const handleCreateTodo=(evt:any)=>{
      setShowMenu(true);
    }
    const todoConfig = useMemo(() => createTodoList, []);
  return (
    <>

      <div className="todo-container w-auto min-h-[450px] m-8  rounded shadow border border-gray-300 bg-white">
        <div>
           <div className='w-full pb-4 shadow'>
            <div className="text-gray-600 font-bold text-sm m-4 flex justify-self-center">{headerTitle.title}</div>

             <div className='flex justify-center'>
              <SearchBox />
              <Button
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Create todo"
                onClick={handleCreateTodo}
                variant={VARIANT.TEXT}
              >
                <CreateIcon className="w-6 h-6 text-blue-500 " />
              </Button>
             
             
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
      {showMenu &&
        (
        <AsideMenu
          isOpen={showMenu}
          title='Create todo'
          setIsOpen={setShowMenu}
        >
         <FormGroup config={todoConfig} />
        </AsideMenu>
        )
      } 

    </>
  )
}

export default TodoContainer
