import { useMemo, useRef, useState } from 'react'

import { headerTitle, Variant } from '../../helper/enum'
import CreateIcon from '../Icons/createIcon'
import SearchBox from '../searchBox'
import AsideMenu from '../asideMenu'
import { FormGrp } from '../formGroup/formGroup'
import { useUpdateDataMutation } from '../../api-services'
import { showToast } from '../showToast'
import { createTodoConfig, todoListConfig } from '../../config/todoConfig'
import ShowConfirmation from '../confirmation/showConfirmation'
import { Button } from '../button'
import { addRow, removeRow, updateRow } from '../../helper/utils'

const TodoContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const todoRef = useRef(null);
  const createTodoRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState<Record<string,any> | null>(null)
  const [update] = useUpdateDataMutation();

  const handleSave = (evt: any) => {
    evt?.preventDefault();
   const data = createTodoRef?.current?.formik?.values;
    if(editParams){
      
      updateRow(editParams,data);
      setEditParams(null);
    } else {
        const gridApi=todoRef?.current?.gridRef?.current?.gridOptions;
       if(gridApi){
          addRow(gridApi,data);
       }
    }
     setShowMenu(false);
  }

  const handleEdit = (params: any) => {
    if (params)
      setEditParams(params);
      setShowMenu(true);
  }

  const onConfirm = () => {
      
       if(showConfirmation){
          removeRow(showConfirmation?.params);
          setShowConfirmation(null);
       }
      
  }
  const handleDelete = (params: any) => {
    setShowConfirmation({
      isOpen: true,
      params
    })

  }

  const handleComplete = (evt: any) => {
   
  }

  const onClose = (evt?: any) => {
    evt?.preventDefault();
    setEditParams(null);
  }

  const todoGridConfig = useMemo(() => {
    return todoListConfig(handleEdit, handleDelete, handleComplete)
  }, [handleEdit, handleDelete, handleComplete])

  const createTodoFormConfig = useMemo(() => {
    return createTodoConfig(editParams)
  }, [editParams])
   
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">

        <div className='bg-white sticky top-0 z-10 p-4 shadow-sm flex flex-col items-center '>
          <div className="text-gray font-bold text-lg mt-4">{headerTitle.title}</div>
        <div className='flex  items-center'>
          <SearchBox />
          <Button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="Create todo"
            onClick={() => setShowMenu(true)}
            variant={Variant.Empty}
            className='btnHover'
            type='button'
          >
            <CreateIcon className="w-6 h-6 text-primary" />
          </Button>


        </div>
        </div>
        <div className=" w-full p-4 overflow-y-auto hide-scrollbar flex-1 ">
          <FormGrp group={todoGridConfig} ref={todoRef} />
        </div>

      </div>
      {showMenu &&
        (
          <AsideMenu
            isOpen={showMenu}
            title={editParams ? 'Edit todo' : 'Create todo'}
            setIsOpen={setShowMenu}
            onSave={handleSave}
            onClose={onClose}
            width='500'
          >
            <FormGrp group={createTodoFormConfig} ref={createTodoRef} />
          </AsideMenu>
        )
      }

      {showConfirmation?.isOpen && (<ShowConfirmation isOpen={showConfirmation?.isOpen} onConfirm={onConfirm} onCancel={() => { setShowConfirmation(null) }} />)}

    </>
  )
}

export default TodoContainer
