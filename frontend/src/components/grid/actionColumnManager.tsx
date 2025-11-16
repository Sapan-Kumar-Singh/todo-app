import { v4 as uuidv4  } from "uuid";
import { ValidationIcon } from "../Icons/validationIocn";
import type { AdditionalIconsType, GroupType, SectionsType } from "../types";
import { GridIcon } from "./gridIcon/gridIcon";
import CreateRowIcon from "../Icons/createRowIcon";
import EditRowIcon from "../Icons/editRowIcon";
import DeleteRowIcon from "../Icons/deleteRowIcon";



const crudIconColumn={
    field:'CRUD',
    headerName:'',
    cellClass:'crud-icon-column grid-read-only-cell',
    width:60,
    editable:false,
    lockPinned:true,
    hide:false,
    lockVisible:true,
    type:'supressFilter',
    resizable:false,
    supressMenu:true,
}

const onMouseEnter = (e: any) => {
  const nearestAgRow = e.target.closest('.ag-row')
  const rowIndex = nearestAgRow.getAttribute("row-index")
  const gridBody = nearestAgRow.closest('.ag-body')
  const currentRow = gridBody.querySelector(`.ag-center-cols-container .ag-row[row-index="${rowIndex}"]`)
  const currentLeftRow = gridBody.querySelector(`.ag-pinned-left-cols-container .ag-row[row-index="${rowIndex}"]`)
  const currentRightRow = gridBody.querySelector(`.ag-pinned-right-cols-container .ag-row[row-index="${rowIndex}"]`)
  if (currentRow && currentLeftRow && currentRightRow) {
    currentRow.classList.add('active-grid-row')
    currentLeftRow.classList.add('active-grid-row')
    currentRightRow.classList.add('active-grid-row')
  }
}
const onMouseLeave = (e: any) => {
  const nearestAgRow = e.target.closest('.ag-row')
  const rowIndex = nearestAgRow.getAttribute("row-index")
  const gridBody = nearestAgRow.closest('.ag-body')
  const currentRow = gridBody.querySelector(`.ag-center-cols-container .ag-row[row-index="${rowIndex}"]`)
  const currentLeftRow = gridBody.querySelector(`.ag-pinned-left-cols-container .ag-row[row-index="${rowIndex}"]`)
  const currentRightRow = gridBody.querySelector(`.ag-pinned-right-cols-container .ag-row[row-index="${rowIndex}"]`)
  if (currentRow && currentLeftRow && currentRightRow) {
    currentRow.classList.remove('active-grid-row')
    currentLeftRow.classList.remove('active-grid-row')
    currentRightRow.classList.remove('active-grid-row')
  }
}





const leftActions = {
    pinned: 'left',
    field: "CRUD_left",
    cellStyle: { paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 0, display: 'flex', justifyContent: 'center' },
    cellRenderer: (param: { colDef: any; data: { CRUD: string, isTotalRow: any, __errors?: any } }) => {

        const CRUD_Flag = param?.data?.CRUD?.toUpperCase?.();
        let uid = uuidv4();
        const errors = param.data.__errors;
        return (
            !(param && param.data && param.data.isTotalRow) && (
                <>
                    {param?.data?.["__errors"] &&
                        Object.keys(param.data?.["__errors"])?.length ? (
                        <>
                            <GridIcon
                                {...param}
                                data-tooltip-id="globle-error-tooltip"
                                data-tooltip-html={Object.values(errors || {}).map(
                                    (v) => `${v}<br/>`
                                ).join('')}
                                data-tooltip-place="right"
                            >
                                <ValidationIcon className="mr-[5px]" />
                            </GridIcon>
                        </>
                    ) : null}
                    <GridIcon
                        {...param}
                        id={uid}
                        data-tooltip-id="globle-tooltip"
                        data-tooltip-content={
                            CRUD_Flag === 'D'
                                ? 'Deleted row'
                                : CRUD_Flag === 'U'
                                    ? 'Updated row'
                                    : ''
                        }
                        data-tooltip-place="right"
                    >
                        
                        {CRUD_Flag === 'D' ? (
                            <DeleteRowIcon />
                        ) : CRUD_Flag === 'U' ? (
                            <EditRowIcon />
                        ) : CRUD_Flag=== 'C' ?<CreateRowIcon/> : (
                            <></>
                        )}
                    </GridIcon>

                </>
            )
        )
    },
    
    
}

const rightActions = (section: SectionsType | undefined, group: GroupType) => {
  let uid = uuidv4();

  return {
    pinned: 'right',
     field: "CRUD_right",
    cellClass: 'delete-icon-column grid-read-only-cell',
    excelExport: false,
    cellStyle: {
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 0,
      paddingBottom: 0,
      display: "flex",
      justifyContent: "space-between",
    },
    cellRenderer: (param: any) => {

      return (
        <>
          {group && group.type === "grid" && group.additionalIcons
            ? group.additionalIcons.map(
                (e: AdditionalIconsType, index: number) => (
                  <GridIcon
                    {...param}
                    onClickHandler={() =>
                      e.onClickHandler &&
                      e.onClickHandler({ param, section, group })
                    }
                    showOnHover={true}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    key={index}
                  >
                    {e.icon}
                  </GridIcon>
                )
              )
            : null}

         
        </>
      );
    },
  };
};




export const appendActionColumns = (gridColumnConfig: any, section: any | undefined, group: GroupType) => {
    if (!gridColumnConfig.isColumnDefsUpdated) {
        const modifiedCss = group && group.type === 'grid' && group.additionalIcons && group.additionalIcons.length ? {
            width: ((group.additionalIcons.length + 1) * crudIconColumn.width),
            display: 'flex!important',
            justifyContent: 'space-between!important'
        } : { width: crudIconColumn.width }
        if (group && group.type === 'grid' && !(group.supressCrud && group.supressCrud())) {
           gridColumnConfig.columnDefs=[
            {...crudIconColumn,...leftActions},
            ...gridColumnConfig.columnDefs
           ]
        }

        if(group && group.type==='grid' && (group.additionalIcons?.length || !(group.supressDeleteIcon && group.supressDeleteIcon()))){
            gridColumnConfig.columnDefs.push({...crudIconColumn,modifiedCss,...rightActions(section,group)})
        }

    }


}