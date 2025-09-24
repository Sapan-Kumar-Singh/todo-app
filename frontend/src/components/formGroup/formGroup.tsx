import React, { useEffect, useMemo, useRef, useState, type ForwardedRef } from 'react'
import type { FormField } from '../types';
import { useFormik } from 'formik';
import type { SectionsType, GroupType } from '../types';
import { useStateRef } from '../context/UseStateRef';
import { Skeleton } from '../skeleton';
import { InputForm } from '../inputForm/inputForm';
import Grid from '../grid';
import { appendActionColumns } from '../grid/actionColumnManager';


interface FormGrpProps {
  section?: SectionsType;
  group: GroupType;
  groupIndex?: number;
  isSectionDisable?: boolean;
  isTabDisable?: boolean;
  className?: string;
};



const FormGrpComponent = React.forwardRef<HTMLDivElement, FormGrpProps>(
  (
    {
      section,
      group,
      groupIndex,
      isSectionDisable,
      isTabDisable,
      className = "",
    },
    ref: any
  ) => {
    const formRef = useRef<HTMLDivElement | null>(null);
    const isFormFields = group.type === 'inputFields';
    const isFormGrid=group.type==='grid';
    const isFormJsx = group.type === 'jsx';
    const JsxChildren=isFormJsx && group.children;

    const CRUDRef = useRef<boolean>(false);
    const gridRef=useRef(null);
    const[queryConfig,setQueryConfig]=useState({...group?.queryConfig});

    if (isFormFields && !group.fields) {
      console.error(
        `FormError: No fields passed for ${section?.name ? "Section:" + section.name : ""
        } group at ${groupIndex}
        }`
      );
    }
    
    const hasActionColums=useRef(false);
    let [data, setData, dataRef] = useStateRef([]);
    let [isLoading, setIsLoading] = useStateRef(false);
    let [isFetching, setIsFetching] = useStateRef(false);
    let [status, setStatus] = useStateRef(null);
    let refetch=()=>{};
     const gridId=useMemo(()=>{
           return group?.customGridId || `tab_section_group_${groupIndex || "0"}`;
     },[section])
    const styles = useMemo(() => {
      return { minHeight: "200px" };
    }, [group]);
    const loaderOptions = {
      type: "formContainer",
      layout: "grid-skeleton",
      isFullWidth: false,
      styles: styles,
    };
   
    const{query=()=>{},queryOptions,queryParams,dependentParams}=queryConfig || {};
    let extraQuery={};
    let skipQuery=false;
 
    const [initialFieldValues, setInitialFieldValues] = useState<Record<string, any>>();
     
    const params=useMemo(()=>(
      {...queryParams,...extraQuery}
    ),[queryParams,extraQuery]);

    const skip=useMemo(()=>Object.values(params).some((p)=>typeof p ==='undefined' || skipQuery),[skipQuery,params]);
    const options=useMemo(()=>({...queryOptions,skip}),[queryOptions,skip]);
     let groupFetchedData:any;
    
     try {
       groupFetchedData=query(queryParams,options);
     } catch(err){
      console.log("when error=",query,queryOptions,queryParams);
      console.log("hook error",err);      
     }
    const formik = useFormik({
      initialValues: {},
      validate: (values: any) => {

      },
      onSubmit: (_values: any) => {
        // console.log('values', values)
      },
    })

    const calculateInitialFormValues = () => {
      if (isFormFields) {
        CRUDRef.current = data !== undefined && data !== null;

        const formData = Array.isArray(data) ? data?.[0] : data;

        const initialValues = group.fields?.reduce(
          (obj: any, item: FormField) => {
            const fieldVal =
              formData && formData[item.field] != undefined ? formData[item.field] : "";

            if (fieldVal || fieldVal === "" || fieldVal === null) {
              switch (item.type) {
                case "select": {
                  const displayValue =
                    item.displayField &&
                      formData &&
                      formData[item.displayField] != null &&
                      formData[item.displayField] != undefined
                      ? formData[item.displayField]
                      : "";

                  obj[item.field] =
                    formData &&
                      formData[item.field] &&
                      formData[item.field] != null &&
                      formData[item.field] != undefined && item?.fieldProps?.config?.mode !== 'multiSelect'
                      ? item.displayField
                        ? {
                          [item.fieldProps?.labelField || "label"]:
                            displayValue,
                          [item.fieldProps?.valueField || "value"]: fieldVal,
                        }
                        : { [item.fieldProps?.valueField || "value"]: fieldVal }
                      : fieldVal;
                  if (!obj[item.field] && item.fieldProps?.value) {
                    obj[item.field] = item.fieldProps?.value
                  }
                  break;
                }
                // case "date": {
                //   obj[item.field] = convertDateStringToDateInput(fieldVal);
                //   if (!obj[item.field] && item.fieldProps?.value) {
                //     obj[item.field] = convertDateStringToDateInput(
                //       item.fieldProps?.value
                //     );
                //   }
                //   break;
                // }
                default: {

                  obj[item.field] = fieldVal;
                  if (!obj[item.field] && item.fieldProps?.value) {
                    obj[item.field] = item.fieldProps?.value;
                  }
                  if (item.formatingMask === "number") {
                    //obj[item.field] = formatNumberUtil(obj[item.field]);
                  }
                }
              }
            } else {
              if (item.fieldProps?.value) {
                switch (item.type) {
                  case "date": {
                    // obj[item.field] = convertDateStringToDateInput(
                    //   item.fieldProps?.value
                    // );
                    break;
                  }
                  default: {
                    obj[item.field] = item.fieldProps?.value;
                  }
                }
              }
            }

            return obj;
          },
          {}
        );
        formik.setTouched({});
        formik.setValues(initialValues);
        setInitialFieldValues(initialValues);
        // triggerFormChangeEvent();
      }
    };
    
     const modifyQueryConfigParam=(params:any)=>{
      setQueryConfig((prevState:any)=>({
        ...prevState,
        params
      }))
     }
     if(groupFetchedData){
        data=groupFetchedData?.data?.['Data'];
        isFetching=groupFetchedData.isFetching;
        isLoading=groupFetchedData.isLoading;
        refetch=groupFetchedData.refetch;
        status=groupFetchedData.status;
     } else if(group.rows && !group.queryConfig){
      data=group.rows;
      isLoading=false;
      isFetching=false;
     }

     if(data && Array.isArray(data)){
        if(isFormGrid && data && group.editable){
          data=data.map((element:any)=>({...element,CRUD:"R"}))
        }
     }
    if (ref && formRef) {
      ref.current = {
        ...ref.current,
        group,
        section,
        groupIndex,
        formik,
        formRef,
         CRUDRef,
         gridRef,
        queryData: groupFetchedData,
        // handleSubmit,
         modifyQueryConfigParam,
        // onRefetch() {
        //   calculateInitialFormValues();
        //   toolTipInitial();
        // },
        // inputChangeStatus,
      };
    }
     
    useEffect(()=>{
      
          if(isFormGrid && !hasActionColums.current){
            let gridColumnConfig=group.groupChildProps?.uiConfig;
            const defaultColDef={
                resizable: true,
                width: 150,
               editable: false,
            }
            if(!gridColumnConfig.defaultColDef){
               gridColumnConfig.defaultColDef={defaultColDef}
            } else{
              gridColumnConfig.defaultColDef={
                ...defaultColDef,
                ...gridColumnConfig?.defaultConDef
              } 
            }

            if(isFormGrid && group.editable===true){
              gridColumnConfig=appendActionColumns(
                gridColumnConfig,
                section,
                group
              )
            }
             hasActionColums.current=true;
          }
    },[])
    const formValue = () => {
      return (
        <>
       { isFormFields && group.fields && (
          <div
            className={`input-box-container form-container ${group.hiddenChangeIcon ? "!p-0" : "!pb-[19px] !px-6"
              } pl-6 text-xs !leading-[18px] ${group.fields?.filter((e) =>
                typeof e.hidden === "function"
                  ? e.hidden(formik)
                  : e.hidden
              ).length === group.fields?.length
                ? "pace-p-0"
                : ""
              } ${className}`}
          >
            {group.fields?.map((field: FormField, index: number) => (
              <InputForm
                key={index}
                field={field}
                formik={formik}
                initialFieldValues={initialFieldValues}
                groupFields={group.fields}
                isTabDisable={isTabDisable || isSectionDisable}
              />
            ))}
          </div>
        )}
        {isFormGrid && (
          <div
             style={group.groupChildProps?.uiConfig?.domLayout !=='autoHeight' ? styles : {}}
            >
            <Grid
             {...(group.groupChildProps)}
                      id={gridId}
                      key={data?.length ? `filled-grid-${gridId}` : `empty-grid-${gridId}`}
                      ref={gridRef}
                     // preserveSelectedTabData={true}
                      style={{ height: '100%'}}
                      rows={data}
                      groupIndex={groupIndex}
                    //  allowGridSizeChange={noGridResize ? false : allowGridSizeChange}
                     // showTotal={group.showTotal ?? false}
                     // formContext={formContext}
                      // formContainerApi={
                      //   formContainerApi ? formContainerApi : ({} as FormApi)
                      // }
                      isEditableGrid={group.editable}
                      group={group}
                      title={section?.name || ''}
                      sectionId={section?.id}
                      isTabDisable={isSectionDisable || isTabDisable}
                     // formik={formik}
                    //  refetch={ref?.current?.refetch}
            />
          </div>
        )}

        {isFormJsx && JsxChildren && <JsxChildren/>}
        </>
      );
    };

    useEffect(() => {
      calculateInitialFormValues();
    }, [data])


    return <form
      className="h-full"
      autoComplete="off"
      ref={formRef}
      onSubmit={formik.handleSubmit}
    >
      {isLoading || isFetching || !formik ? (
        <Skeleton {...loaderOptions} />
      ) : (
        formValue()
      )}
    </form>
  }
);



export const FormGrp = React.memo(FormGrpComponent);
