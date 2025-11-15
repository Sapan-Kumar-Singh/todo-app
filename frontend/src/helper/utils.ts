import { v4 as uuidv4 } from 'uuid';


export const setToken=(data:any)=>{
    const token=data.token ?? "";
    localStorage.setItem('token',token)
}

export const getToken=()=> localStorage.getItem('token');

export const addRow = (gridApi: any, data: any) => {
  if (gridApi) {
    const lastRowIndex = gridApi?.api.getDisplayedRowCount();
    const newRow = {
      "grid-identifier": uuidv4(),
      CRUD: "C",
      ...data,
    };
    gridApi?.api.applyTransaction({
      add: [newRow],
      addIndex: lastRowIndex,
    });
    gridApi?.api.refreshCells({ force: true });
  }
};

export const updateRow=(params:any,updatedData:any)=>{
     
      const gridRowData=params?.param?.data;
      const rowIndex=params?.param?.node['rowIndex'];
      const api=params?.param?.api;
      if(gridRowData['CRUD']==='C'){
        // update locally
        const updatedRow={
            ...gridRowData,
            ...updatedData
        }
        api?.applyTransaction({
            update:[updatedRow],
            addIndex:rowIndex
        })
      } else{
         // alos update db
        const updatedRow={
            ...gridRowData,
            "CRUD":'U',
            ...updatedData
        }
        api?.applyTransaction({
            update:[updatedRow],
            addIndex:rowIndex
        })
      }

}

export const removeRow=(params:any)=>{
    const data=params?.param?.data;
    const api=params?.param?.api;
    const rowIndex=params?.param?.node['rowIndex'];
    if(params && data  && api){
        // data deleted to grid only
        if(data.CRUD==='C'){
             api?.applyTransaction({ remove: [data] });
        } else{
            // data deleted to db aslo
            const deletedRow={
                ...data,
                "CRUD":'D'
            }
            api?.applyTransaction({
                add:[deletedRow],
                addIndex:rowIndex
            })
        }
         
      api.refreshCells(({force:true}))
    }
   
}

 export const getAllRowData=(gridApi:any)=>{
       const rowData:any[]=[];
       gridApi?.forEachNode((row:any)=>{
        rowData.push(row.data)
       })
       return rowData;
  }

export const formattedDate = (isoString:string) => {
    if(!isoString) return;
  const date = new Date(isoString);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const formatted=`${year}-${month}-${day}`
  return formatted;
}