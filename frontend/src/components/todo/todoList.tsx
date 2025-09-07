import { VARIANT } from "../../helper/enum";
import Button from "../button";
import CheckBox from "../checkBox";
import DeleteIcon from "../Icons/deleteIcon";
import EditIcon from "../Icons/editIcon";
import TextArea from "../TextArea";

interface TodoListType {
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

const TodoList = ({ title, description, completed, dueDate }: TodoListType) => {
    return (
        <>
            <div className="grid grid-cols-[40px_1fr_1fr_100px_200px] gap-4 border-b-2 border-gray-300 p-4 items-center">
                <div><CheckBox checked={completed} /></div>

                <div className="font-bold text-xl text-gray-600 truncate">
                    {title}
                </div>

                <div><TextArea content={description} disabled={true} /></div>

                <div className="font-semibold text-gray-400">{dueDate}</div>

                <div className="space-x-2">
                    <Button variant={VARIANT.TEXT} onClick={() => console.log("edit")} ><EditIcon/></Button>
                    <Button variant={VARIANT.TEXT} onClick={() => console.log("edit")} ><DeleteIcon/></Button>
                </div>
            </div>
        </>
    )
}

export default TodoList
