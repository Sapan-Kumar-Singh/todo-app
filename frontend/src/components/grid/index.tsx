import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import type { GroupType } from "../types";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"
import { DETAIL_GRID_VIEWS } from "../../helper/enum";
import { v4 as uuidv4 } from 'uuid';
import { getResultSelectorWithErrorHandler } from "../../api-services";
ModuleRegistry.registerModules([AllCommunityModule]);
import './grid.scss';
import { columnTypesConfig } from "./formatCols";

type UiConfigOptions = {
  hideSwitcher?: boolean;
  defaultView?: DETAIL_GRID_VIEWS;
  getMainMenuItems: (params: { defaultItems: any[]; }) => any[];
  gridHeaderPanel: any;
  columnTypes: any;
  columnDefs: any;
  onCellClicked: any;
  sideBar: any;
  getRowClass: any;
  onGridReady: any;
  onCellValueChanged?: any;
  defaultCsvExportParams?: any;
  defaultExcelExportParams?: any;
  onDisplayedColumnsChanged: any;
  onSortChanged: any;
  onFilterChanged: any;
  onFirstDataRendered: any;
  isCellLinkType: any;
  defaultColDef: any;
  gridApi: any;
  autoGroupColumnDef: any;
  isDataLoaded: boolean;
  domLayout: string;
  isError: any;
  suppressPersonalization: any;
  headerToolPanel?: any;
  sectionTitle?: any;
  detailViewConfig: {
    clickableColumns?: [];
    hideCloseButton?: boolean;
    onListItemClick?: (item: any) => void;
    enableDetailView: boolean;
    renderItem: (row: any) => any;
    RightPanel?: any;
    rightPanelConfig?: Record<any, any> | Function;
    rightPanelId: string | number;
    leftColSpan: number;
    rightColSpan: number;
  };
  expandToPageHeight?: boolean;
  className: any;
  aggFuncs: any;
  isColumnFilterable: boolean;
  filterCountDisplayText: string;
  treeData?: boolean;
  expandedRowId?: string; // <-- Added property
  rowsDefaultExpandTill?: number; // <-- Optionally add this if used elsewhere
  version?:any
};

type GridProps = {
  reduxConfig: any;
  uiConfig:UiConfigOptions;
  style: any;
  rows: { [x: string]: any }[];
  filteredData: any;
  showTotal: number;
  currencyColumnName: string;
  id: string;
  isFetching?: boolean;
  groupIndex?: any;
  allowGridSizeChange?: boolean;
  personalizationId?: string;
  catagory: string;
  formContext: any;
  submitState: any;
  isEditableGrid: boolean;
  group?: GroupType;
  title?: string;
  sectionId?: string;
  isTabDisable?: boolean;
  showDownloadIcon?: boolean;
  modifiedRef: any;
  formik:any
};

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

const Grid = React.memo(
  React.forwardRef<AgGridReact<IRow>, GridProps>((props, ref) => {

    const {
      reduxConfig,
      uiConfig,
      style,
      rows,
      id,
      filteredData,
      showTotal,
      //totalOptions,
      currencyColumnName,
      groupIndex,
      allowGridSizeChange,
      personalizationId,
     // formContainerApi,
      catagory,
     // triggerFormChangeEvent,
      isFetching,
      isEditableGrid,
      group,
      title = "",
      sectionId,
      isTabDisable,
      modifiedRef,
      showDownloadIcon = false,
      formik
     // refetch
    } = props;

    const {
      hideSwitcher = false,
      defaultView = DETAIL_GRID_VIEWS.GRID_VIEW,
      columnDefs,
      onCellClicked,
      detailViewConfig,
      getRowClass,
     // rowClassRules,
      onGridReady,
      onDisplayedColumnsChanged,
      onSortChanged,
      onFilterChanged,
      onFirstDataRendered,
      isCellLinkType,
      suppressPersonalization,
      headerToolPanel,
      expandedRowId,
      rowsDefaultExpandTill,
      sectionTitle,
      expandToPageHeight,
      aggFuncs: aggFuncsFromApplication,
      ...otherUIConfig
    } = uiConfig;
     
     if(uiConfig && !uiConfig.columnTypes){
      uiConfig.columnTypes=columnTypesConfig;
     }
    const gridId=useCallback(()=>{
          return `${props.id ? props.id : 'default-ag-grid'}`;
    },[props.id])
    const[columnDefination,setColumnDefination]=useState([]);

    const queryResult = reduxConfig?.query?.(reduxConfig?.params, {
      selectFromResult: getResultSelectorWithErrorHandler(
        reduxConfig.resultSelector
      ),
      // skip: !!reduxConfig,
    });

    const addGridIdentifier = (data: any[]) => {
      data?.forEach?.((obj) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!obj.hasOwnProperty("grid-identifier")) {
          const gridIdentifier =uuidv4();
          obj["grid-identifier"] = gridIdentifier;
        }
      });
      return data;
    };
        
    const data = useMemo(
      () =>
        reduxConfig
          ? isEditableGrid ? addGridIdentifier(queryResult?.data) : queryResult?.data
          : rows ? isEditableGrid ? addGridIdentifier(rows) : rows
            : [], [rows, queryResult, isEditableGrid]);

      const flattenArray = useCallback((columnDefsArray: any[], parentField = '') => {
      let flatArray: any[] = [];

      columnDefsArray.forEach((column: any) => {
        let fieldName = parentField ? `${parentField}.${column.field}` : column.field;

        if (column.children?.length) {
          flatArray = flatArray.concat(flattenArray(column.children, fieldName));
        } else {
          flatArray.push({
            field: fieldName,
            ...column
          });
        }
      });

      return flatArray;
    }, []);


      const getCustomRowClass = useCallback(
      (params: any) => {
        let rowClass = "";
        if (getRowClass) {
          rowClass = getRowClass(params);
        }
        let isRowWithTextarea = false;
        const flattColumnDef = flattenArray(columnDefs)

        flattColumnDef?.filter((element: any) => {

          if (element?.type?.includes("customeTextAreaCell")) {
            isRowWithTextarea = true;
          }
        });
        if (isRowWithTextarea) {
          rowClass += "row-with-textarea";
        }

        if (params.data && params.data.isTotalRow) {
          rowClass += " grid-total-row";
        }

        return rowClass;
      },
      []
    );

    const modifyColumnDef = (columnDefs: any[]) => {
      const newCols = columnDefs.map((ele: any, index: number) => {   
        const headerKeyName = ele.headerNameKey
          ? ele.headerNameKey
          : ele.headerName;
        const headerName = headerKeyName;
        const shouldLockVisible = Array.isArray(ele.type)
          ? ele.type.includes("MandatoryCell") ||
          ele.type.includes("NumberMandatoryCell")
          : ["MandatoryCell", "NumberMandatoryCell"].includes(ele.type);

        const isCustomDateInput = Array.isArray(ele.type)
            ? ele.type.some((type:any) => 
                ['CellDatePicker', 'CellDateTimePicker'].includes(type)
              )
            : typeof ele.type === 'string'
            ? ['CellDatePicker', 'CellDateTimePicker'].includes(ele.type)
            : false;

        const suppressKeyboardEvent =
          isCustomDateInput ? (params: any) => {
              if (params.editing) {
                return [
                  "ArrowUp",
                  "ArrowDown",
                  "ArrowLeft",
                  "ArrowRight",
                  // 'Enter',
                  // 'Tab',
                ].includes(params.event.key);
              }
            }
            : undefined;
        return {
          ...ele,
          // cellClass: index === 0 && rightPanelId(params.data) == searchParams.get('item')? ,
          suppressKeyboardEvent,
          headerNameKey: headerKeyName,
          currencyColumnName: currencyColumnName,
          headerName: headerName,
          hide:ele.hide,
          lockVisible: shouldLockVisible
                ? shouldLockVisible
                : null,
          onCellValueChanged:
            uiConfig && uiConfig.onCellValueChanged
              ? uiConfig.onCellValueChanged
              : null,
        //   comparator:(valueA: any, valueB: any, nodeA: RowNode, nodeB: RowNode, isInverted: boolean) =>
        //   customComparator(valueA, valueB, nodeA, nodeB, isInverted, (ele.field ?? null) ),
          cellEditorPopup: ele.multiSelectDisplayField ? true : false,
        };
      });
      return newCols;
    };



    const defaultColDef: ColDef = {
      flex: 1,
    };

    if(ref && ref.current){
        ref.current={
            ...ref.current,
            gridId:gridId(),
            modifiedRef
        }
    }

    const restoreGridState=()=>{
        const defs=modifyColumnDef(columnDefs);
        setColumnDefination([...defs])
    }

    useEffect(()=>{
        if(!columnDefination.length && columnDefs?.length){
            restoreGridState();
        }
    },[columnDefs])

    const gridProps = useMemo(() => {
      return {
        ref: ref,
        rowData: data,
        getRowClass: getCustomRowClass,
        maintainColumnOrder:true,
       // getContextMenuItems: getContextMenuItems,
        columnDefs: columnDefination,
        context:{formik},
       // onGridReady: handleGridReady,
       // onColumnPinned: handleDisplayedColumnsChanged,
     //   onColumnMoved: handleDisplayedColumnsChanged,
     //   onColumnVisible: handleDisplayedColumnsChanged,
     //   columnResized: handleDisplayedColumnsChanged,
     //   onColumnResized: handleDisplayedColumnsChanged,
     //   onGridSizeChanged: handleSizeChanged,
     //   onSortChanged: handleSortChanged,
      //  onFilterModified: handleFilterChanged,
      //  onFilterChanged: handleFilterChanged,
//        onFirstDataRendered: handleFirstDataRendered,
      //  noRowsOverlayComponent: noRowsOverlayComponent,
    //    onCellClicked: cellClickHandler,
        reactNext: true,
        //onGridPreDestroyed,
        // tooltipShowDelay: 0,
        // tooltipHideDelay: 8000,
        // debounceVerticalScrollbar: true,
        // pinnedBottomRowData:
        // showTotal && (data || []).length ? totalRow.current : [],
        // onColumnPivotModeChanged: handleDisplayedColumnsChanged,
        // onColumnPivotChanged: handleDisplayedColumnsChanged,
        // onColumnRowGroupChanged: handleDisplayedColumnsChanged,
        // inRangeInclusive: true,
        // getLocaleText: getLocaleText,
        // onCellValueChanged: cellValueChangedHandler,
        // onCellEditingStopped: cellValueChangedHandler,
        // processCellForClipboard: processCellForClipboardHandler,
        // processCellFromClipboard: processCellFromClipboardHandler,
        // processDataFromClipboard: processDataFromClipboard,
        // suppressLastEmptyLineOnPaste: true,
        // tabToNextCell: tabToNextCellHandler,
        // onRowDataUpdated: onRowDataUpdatedHandler,
        // suppressDragLeaveHidesColumns: true,
        // onModelUpdated:onModelUpdatedHandler,
        // onRowGroupOpened:onRowGroupOpened,
        // suppressScrollOnNewData: true,
        // excelStyles: updateExcelStyle,
        // onGridPreDestroyed: onGridPreDestroyed,
        // onCellFocused:handleCellFocus,
        // onCellKeyDown:handleCellKeyDown,
        // ...(
        //   (aggFuncs?.current && Object.keys(aggFuncs.current).length > 0) ||
        //   (aggFuncsFromApplication && Object.keys(aggFuncsFromApplication).length > 0)
        //     ? {
        //       aggFuncs: {
        //         ...(aggFuncs?.current && Object.keys(aggFuncs.current).length > 0
        //           ? aggFuncs.current
        //           : {}
        //         ),
        //         ...(aggFuncsFromApplication && typeof aggFuncsFromApplication === "object" && Object.keys(aggFuncsFromApplication).length > 0
        //           ? aggFuncsFromApplication
        //           : {}
        //         )
        //       }
        //     }
        //   : {}
        // ),
        ...otherUIConfig,

        // Conditionally set getRowId
        // ...(isEditableGrid && GridStateManagerFactory.getGridStateData(gridId()) !== undefined && ( (data || []).every((e: any) => e.hasOwnProperty('grid-identifier')))
        //   ? { getRowId: (params: any) =>  params.data['grid-identifier'] }
        //   : {}
        // ),
        ...(isEditableGrid
          ? { getRowId: (params: any) => params.data["grid-identifier"] }
          : {}),
      };
    }, [
      ref,
      data,
     getCustomRowClass,
   //   getContextMenuItems,
      columnDefination,
  //    handleGridReady,
  //    handleDisplayedColumnsChanged,
  //    handleSizeChanged,
  //    handleSortChanged,
   //   handleFilterChanged,
   //   handleFirstDataRendered,
    ///  noRowsOverlayComponent,
      //cellClickHandler,
    //  showTotal,
      //totalRow,
      otherUIConfig,
    //  shouldModifyTotal,
    //  initState,
   //   isLoaded
    ]);

    return (
      <div style={{ height: 400 }} className="ag-theme-material">
        <AgGridReact {...gridProps} />
      </div>
    );
  })
);

export default Grid;
