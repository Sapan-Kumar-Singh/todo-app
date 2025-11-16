import { useMemo, useRef, useState } from 'react'
import AsideMenu from '../asideMenu'
import { FormGrp } from '../formGroup/formGroup'
import { useUpdateDataMutation } from '../../api-services'
import { showToast } from '../showToast'
import { createTodoConfig, todoListConfig } from '../../config/todoConfig'
import ShowConfirmation from '../confirmation/showConfirmation'
import { addRow, getAllRowData, removeRow, updateRow } from '../../helper/utils'
import HeaderPanel from '../headerPanel'

const TodoContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const todoRef = useRef(null);
  const createTodoRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState<Record<string,any> | null>(null)
  const [update] = useUpdateDataMutation();

  const handleCreateEdit = (evt: any) => {
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

 

  const onClose = (evt?: any) => {
    evt?.preventDefault();
    setEditParams(null);
  }

  const todoGridConfig = useMemo(() => {
    return todoListConfig(handleEdit, handleDelete)
  }, [])

  const createTodoFormConfig = useMemo(() => {
    return createTodoConfig(editParams)
  }, [editParams]);
  
 
  const handleSave=async ()=>{
         const gridRef=todoRef?.current?.gridRef;
         if(gridRef && gridRef.current){
            const gridApi=gridRef?.current?.gridOptions?.api;
            const rowData= getAllRowData(gridApi);
            const params={
              __config__:{
                  url:'update',
                  method:'POST',
                  invalidatesTags: () => ['fetch']
              },
              body:{
               data:rowData
              }
            }
           const res = await update(params);
             if(res?.data.status==="Success"){
              const message=res?.data?.message || "datadata updated successfully"
                 showToast(message,"success");
             } else {
              const message=res?.error?.data?.status;
              showToast(message,"error");
             }
         }

  }

 

  return (
    <>
      <div className="w-full h-full bg-white flex flex-col">
           <HeaderPanel handleCreate={()=>setShowMenu(true)} handleSave={handleSave}/>
      
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
            onSave={handleCreateEdit}
            onClose={onClose}
            width='500'
          >
            <FormGrp group={createTodoFormConfig} ref={createTodoRef} />
          </AsideMenu>
        )
      }

      {showConfirmation?.isOpen && (<ShowConfirmation isOpen={showConfirmation?.isOpen} onConfirm={onConfirm} onCancel={() => { setShowConfirmation(null) }} warningMessage={showConfirmation?.params?.param
.data.CRUD!=='C' ? 'Delete this record permanently?' : ''}/>)}

    </>
  )
}

export default TodoContainer
