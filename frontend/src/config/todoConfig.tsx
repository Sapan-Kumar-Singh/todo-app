
import { useFetchDataQuery } from "../api-services";
import { columnTypesConfig } from "../components/grid/formatCols";
import DeleteIcon from "../components/Icons/deleteIcon";
import EditIcon from "../components/Icons/editIcon";




const todoListColDefs={
  columnTypes:columnTypesConfig,
  columnDefs:[
     {
      field:'completed',
      headerName:'Completed',
      width:120,
      type:['CellCheckboxPicker']
    },
    {
      field:'title',
      headerName:'Title',
      width:150,
      readonly:true,
      type:['customeTextCell']
    },
     {
      field:'description',
      headerName:'Description',
      width:250,
      readonly:true,
      type:['customeTextAreaCell']
    }
  ]
}
export const todoListConfig=(handleEdit:(params:any)=>void,handleDelete:(params:any)=>void)=>{
    return {
      type: "grid",
      //  rows:[{'test_grid':'test row1'},{'test_grid':'test row2'}],
      editable:true,
      queryConfig: {
        query: useFetchDataQuery,
        queryParams: {
          queryName: "fetch",
          __config__: {
            url: "fetch",
            method: "GET",
            providesTags:()=>['fetch']
          },
        },
        queryOptions: {
          selectFromResult(response: any) {
            return {
              ...response,
              data: response?.data,
            };
          },
        },
      },
      groupChildProps: {
        uiConfig: {
          ...todoListColDefs,
          sideBar: { toolPanels: [] },
        },
      },
      additionalIcons:[{
        icon:<EditIcon/>,
        onClickHandler:(params:any)=>{
          handleEdit(params)
        }
      },{
        icon:<DeleteIcon/>,
        onClickHandler:(params:any)=>{
          handleDelete(params)
        }
      }]
    };
}

export const createTodoConfig=(editDetails:any)=>{
  
const { title, description } = editDetails || {};
  return {
       type:'inputFields',
       fields:[
        {
          type:'text',
          field:'title',
          label:'Title',
          required:true,
          fieldProps:{
            value:title
          }
        },{
          type:'textarea',
          field:'description',
          label:'Description',
          fieldProps:{
            value:description
          }
        }
       ]
  }
}