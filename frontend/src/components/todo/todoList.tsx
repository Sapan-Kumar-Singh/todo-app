import { useMemo, useState } from "react";
import { VARIANT } from "../../helper/enum";
import Button from "../button";
import CheckBox from "../inputForm/checkBox";
import DeleteIcon from "../Icons/deleteIcon";
import EditIcon from "../Icons/editIcon";
import TextArea from "../inputForm/TextArea";
import AsideMenu from "../asideMenu";
import FormGroup from "../formGroup/formGroup";
import { editTodoList } from "../../config/todoConfig";
import ConfirmationDialog from "../confirmation/showConfirmation";

interface TodoListType {
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

const TodoList = ({ title, description, completed, dueDate }: TodoListType) => {
    const [showMenu, setShowMenu] = useState(false);
    const[showConfirmation,setShowConfirmation]=useState(false);
      const todoConfig = useMemo(() => editTodoList, []);
    const handleEditTodo = (evt: any) => {
        setShowMenu(true);
    }

    const handleDeleteTodo=(evt:any)=>{
         setShowConfirmation(true)
    }
    return (
        <>
            <div className="grid grid-cols-[40px_1fr_1fr_100px_200px] gap-4 border-b-2 border-gray-300 p-4 items-center">
                <div><CheckBox checked={completed} /></div>

                <div className="font-bold text-sm text-gray-600 truncate">
                    {title}
                </div>

                <div><TextArea value={description} disabled={true} /></div>

                <div className="font-semibold text-gray-400">{dueDate}</div>

                <div className="space-x-2">
                    <Button
                        data-tooltip-id="global-tooltip"
                        data-tooltip-content="Edit todo"
                        variant={VARIANT.TEXT}
                        onClick={handleEditTodo}
                    ><EditIcon />
                    </Button>
                    <Button
                        data-tooltip-id="global-tooltip"
                        data-tooltip-content="Delete todo"
                        variant={VARIANT.TEXT}
                        onClick={handleDeleteTodo}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            </div>
            {showMenu &&
                (
                    <AsideMenu
                        isOpen={showMenu}
                        title='Edit todo'
                        setIsOpen={setShowMenu}
                        >
                        <FormGroup config={todoConfig}/>
                    </AsideMenu>
                )
            }
            { showConfirmation &&
             (
                <ConfirmationDialog isOpen={showConfirmation} onConfirm={function (): void {
                    throw new Error("Function not implemented.");
                } } onCancel={()=>{setShowConfirmation(false)}}/>
             )

            }
        </>
    )
}

export default TodoList
