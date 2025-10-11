import { useEffect, useRef, useState, type ChangeEvent } from "react";

import { Input } from "../inputForm/inputFields/inputText";
import { TextArea } from "../inputForm/inputFields/TextArea";
import DateField from "../inputForm/inputFields/dateField";
import CheckBox from "../inputForm/inputFields/checkBox";

export const formattedDate = (isoString: string) => {
  const date = new Date(isoString);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const formatted = `${year}-${month}-${day}`;
  return formatted;
}

const columnTypesConfig:any={
    customeTextCell: {
        cellStyle: { display: 'flex', 'align-items': 'center' },
        cellRenderer: (params: any) => {
            const displayValue = params?.value;
            return (
                <Input uid={params?.colDef?.field} name={params?.colDef?.field}  type={"text"} value={displayValue} readonly={params?.colDef?.readonly} insideGrid={true}/>
            )

        }
    },
   customeTextAreaCell: {
  suppressKeyboardEvent: (params: any) => {
    if (params.event.key === "Enter") {
      return true;
    }
  },
  cellStyle: { display: "flex", alignItems: "center" },
  autoHeight: true,
  cellRenderer: (params: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const updateRowHeight = (height: number) => {
      params.node.setRowHeight(height);
      params.api.onRowHeightChanged();
    };

    useEffect(() => {
      if (contentRef.current) {
        const actualHeight = contentRef.current.scrollHeight;
        const lineHeight = parseFloat(
          window.getComputedStyle(contentRef.current).lineHeight
        );
        const maxAllowedHeight = lineHeight * 3;

        setIsTruncated(actualHeight > maxAllowedHeight);

        if (actualHeight > maxAllowedHeight) {
          if (params?.node?.rowHeight <= 96) {
            updateRowHeight(96);
          }
        } else {
          if (params?.node?.rowHeight < actualHeight) {
            updateRowHeight(actualHeight);
          }
        }
      }
    }, [isExpanded, params.value]);

    const handleToggle = () => {
      setIsExpanded((prev) => !prev);
    };

    return (
      <div style={{ position: "relative", width: "100%" }}>
        <div
          ref={contentRef}
          className="h-[100%] border-none outline-none"
          style={{
            display: isExpanded ? "block" : "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isExpanded ? "none" : 3,
            overflow: "hidden",
            textOverflow: isExpanded ? "clip" : "ellipsis",
            whiteSpace: "normal",
            maxHeight: isExpanded ? "none" : "5em",
            wordBreak: "break-word",
          }}
        >
          <TextArea label="" uid={params?.colDef?.field} field={params?.colDef?.field}  readonly={params?.colDef?.readonly}  value={params?.data?.description}/>
        </div>

        {/* {isTruncated && (
          <div
            className="cursor-pointer text-primary"
            style={{ marginTop: "4px", paddingTop: "4px" }}
            onClick={handleToggle}
          >
            {isExpanded ? "Show less" : "Show more"}
          </div>
        )} */}
      </div>
    );
  },
},
CellDatePicker:{
    cellStyle:{
        textAlign:'left'
    },
    headerClass:'ag-left-aligned-header',
    cellClass:(params:any)=>{
        if(params.value && !isNaN(params.value)){
            return 'dateType'
        }
    },
    cellRenderer:(params:any)=>{
      
      const value=formattedDate(params?.data?.createdAt);
      
           return(
            <div>
                <DateField name={"grid-date"} type={"date"} value={value} readonly={params?.colDef?.readonly}/>
            </div>
           )
    }
},
 CellCheckboxPicker: {
    cellRenderer: (params: any) => {
      let additionalEditable = true;
      const field=`${params?.colDef?.field}_${params.data?._id}`
      if (params?.colDef?.hasOwnProperty("additionalEditable")) {
        if (typeof params.colDef?.additionalEditable === 'function') {
          additionalEditable = params.colDef.additionalEditable(params);
        } else if (typeof params.colDef?.additionalEditable === 'boolean') {
          additionalEditable = params.colDef.additionalEditable;
        }
      } else if (params?.colDef?.hasOwnProperty("editable")) {
        if (typeof params.colDef?.editable === 'function') {
          additionalEditable = params.colDef.editable(params);
        } else if (typeof params.colDef?.editable === 'boolean') {
          additionalEditable = params.colDef.editable;
        }
      }
      const onChange=(evt: ChangeEvent<HTMLInputElement>)=>{
        if(params?.colDef?.onChange){
          params?.colDef?.onChange(evt,params);
        }
      }
      return (
        <div className="checkmarkvalue cell-checkbox">
          <CheckBox field={field} formik={params?.context.formik} value={params.data.completed} onChange={onChange} />
        </div>
      );
    },
    cellEditor: (params: any) => {
      if (params) {
        params.api.stopEditing();
      }
      return <> </>;
    },
    cellStyle: () => {
      return {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems:'center',
      };
    },
    additionalEditable: false,
  },

  
}

const columnTypes=Object.keys(columnTypesConfig);

export {
    columnTypes,
    columnTypesConfig,
}