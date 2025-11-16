
import { useFetchDataQuery } from "../api-services";
import { columnTypesConfig } from "../components/grid/formatCols";
import DeleteIcon from "../components/Icons/deleteIcon";
import EditIcon from "../components/Icons/editIcon";

const colDefs=()=>{
  return  {
   columnTypes:columnTypesConfig,
    columnDefs:[
     {
      field:'completed',
      headerName:'Completed',
      width:100,
      type:['CellCheckboxPicker'],
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
      width:200,
      readonly:true,
      type:['customeTextAreaCell']
    },{
      field:'createdDate',
      headerName:'Created date',
      width:150,
      readonly:true,
      type:['CellDatePicker']
    }
  ]
  }
}



export const todoListConfig=(handleEdit:(params:any)=>void,handleDelete:(params:any)=>void)=>{
    return {
      type: "grid",
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
        style:{height:'200px' , width:'100%'},
        uiConfig: {
          ...colDefs(),
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

export const createTodoConfig=(editParams:any)=>{
 
const data = editParams?.param?.data || {};
  return {
       type:'inputFields',
       fields:[
        {
          type:'text',
          field:'title',
          label:'Title',
          required:true,
          fieldProps:{
            value:data?.['title']
          }
        },{
          type:'textarea',
          field:'description',
          label:'Description',
          fieldProps:{
            value:data?.['description']
          }
        },{
          type:'date',
          field:'createdDate',
          label:'Created date',
          readonly:true,
          fieldProps:{
            value: data?.['createdDate'] || new Date()
          }
        }
       ]
  }
}