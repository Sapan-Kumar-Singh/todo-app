import { useMemo, useRef, useState } from 'react'

import { headerTitle, VARIANT } from '../../helper/enum'
import Button from '../button'
import CreateIcon from '../Icons/createIcon'
import SearchBox from '../searchBox'
import AsideMenu from '../asideMenu'
import { FormGrp } from '../formGroup/formGroup'
import { useUpdateDataMutation } from '../../api-services'
import { showToast } from '../showToast'
import { createTodoConfig, todoListConfig } from '../../config/todoConfig'
import ShowConfirmation from '../confirmation/showConfirmation'


const TodoContainer = () => {
    const[showMenu,setShowMenu]=useState(false);
    const[editDetails,setEditDetails]=useState(null);
    const todoRef=useRef(null);
    const createTodoRef=useRef(null);
    const[showConfirmation,setShowConfirmation]=useState(null)
    const[update]=useUpdateDataMutation();

  const handleSave =async (evt: any) => {
    evt?.preventDefault();
    const {title,description}=createTodoRef?.current?.formik?.values;
    const params = {
      name: { url: 'update' },
      body: {
        CRUD: editDetails ? 'U' : 'C',
        _id: editDetails ? editDetails?.["_id"] : null,
        title: title,
        description: description,
      },
      __config__: {
        invalidatesTags: () => ['fetch']
      }
    }
    const res= await update(params);
    if(res?.data?.status==="Success"){
      const message=editDetails ? "Todo edited successfully!" : "Todo created successfully!";
      showToast(message,"success")
    } else {
      const message=editDetails ? "Failed to edit todo!" : "Failed to create todo!";
      showToast(message,"error");
    }
     if(editDetails){
      setEditDetails(null);
     }
     setShowMenu(false);
  }

  const handleEdit = (params: any) => {
    if (params.param.data)
      setEditDetails({ ...params.param.data });
    setShowMenu(true);
  }

  const onConfirm=async ()=>{
      const param = {
      name: { url: 'update' },
      body: {
        CRUD:"D",
        _id:  showConfirmation?.data?.["_id"] || null,
      },
      __config__: {
        invalidatesTags: () => ['fetch']
      }
    }
    const res= await update(param);
    if(res?.data?.status==="Success"){
        showToast("Todo deleted successfully","success");
       
    } else {
        showToast("Failed to delete todo!","error");
        
    }
     setShowConfirmation(null)
  }
  const handleDelete=(params:any)=>{
        setShowConfirmation({
          isOpen:true,
          data:{...params.param.data}
        })

  }


     const todoGridConfig=useMemo(()=>{
          return todoListConfig(handleEdit,handleDelete)
     },[handleEdit,handleDelete])
    
     const createTodoFormConfig=useMemo(()=>{
      return createTodoConfig(editDetails)
     },[editDetails])
    
  return (
    <>
      <div className="todo-container w-auto min-h-[450px] m-8  rounded shadow border border-gray-300 bg-white">
        <div >
           <div className='w-full pb-4 shadow'>
            <div className="text-gray-600 font-bold text-sm m-4 flex justify-self-center">{headerTitle.title}</div>

             <div className='flex justify-center'>
              <SearchBox />
              <Button
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Create todo"
                onClick={()=>setShowMenu(true)}
                variant={VARIANT.TEXT}
              >
                <CreateIcon className="w-6 h-6 text-blue-500 " />
              </Button>
             
             
             </div>
           </div>

          {/* Scrollable todo list */}
          <div className="max-h-[300px] min-w-3xl w-full overflow-y-auto p-4 hide-scrollbar">
             <FormGrp group={todoGridConfig} ref={todoRef}/>
          </div>
        </div>
      </div>
      {showMenu &&
        (
        <AsideMenu
          isOpen={showMenu}
          title={editDetails ? 'Edit todo' : 'Create todo'}
          setIsOpen={setShowMenu}
          onSave={handleSave}
          width='500'
        >
          <FormGrp group={createTodoFormConfig} ref={createTodoRef}/>
        </AsideMenu>
        )
      } 

      {showConfirmation?.isOpen && (<ShowConfirmation isOpen={showConfirmation?.isOpen} onConfirm={onConfirm} onCancel={()=>{setShowConfirmation(null)}}/>)}

    </>
  )
}

export default TodoContainer
