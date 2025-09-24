
import type {  FormField } from '../types';
import CheckBox from './inputFields/checkBox';
import React from 'react';
import { Input } from './inputFields/inputText';
import { TextArea } from './inputFields/TextArea';
import { v4 as uuidv4 } from 'uuid';
import DateField from './inputFields/dateField';
interface InputFormProps {
  field:FormField
  formik:any
  initialFieldValues:any
  groupFields:FormField[]
  isTabDisable?:boolean
}

export const InputForm=React.memo(({field,formik,initialFieldValues,groupFields,isTabDisable}:InputFormProps)=>{

   const getInputElFromConfig = (
      {
        type,
        label,
        field,
        required,
        readonly,
        hidden,
        tooltipColumn,
        maxlength,
        allowNegative,
        convertPercentage = false,
        ...otherConfig
      }: FormField,
      formik: any
    ) => {

      const uid = otherConfig?.uid ? otherConfig.uid : uuidv4();

      const fieldFlexWidth = `calc(${
        otherConfig.layoutConfig?.flex
          ? otherConfig.layoutConfig.flex * 100
          : ""
      }% - 10px)`;
      

      const remoteValidationErrors={
        'text':'11',
        'number':'22',
      }
      const hasFieldError = formik.isSubmitting ||  formik.touched[field] ||  formik.errors[field]
      const onChange=(evt:any)=>{
        
        if(formik){
           formik.setFieldValue(field,evt.target.value)
        }
      }

      if (hidden) return <></>;
      switch (type) {
        case "text":
          return (
            <Input
              className={otherConfig?.className}
              fieldFlexWidth={fieldFlexWidth}
              label={label}
              required={required}
              name={field}
              readonly={readonly}
              value={formik.values[field]}
              onBlur={(e) => formik?.handleBlur(e)}
              onChange={onChange}
              maxlength={maxlength}
              type={type}
              errorMessage={
                hasFieldError
                  ? formik.errors[field]
                  : ""
              }
            />
          );
        case "textarea":
          return (
           <TextArea
             className={otherConfig?.className}
              fieldFlexWidth={fieldFlexWidth}
              rows={otherConfig?.rows}
              resizeable={otherConfig?.resizeable}
              label={label}
              required={required}
              uid={uid}
             // ref={textAreaRef}
              field={field}
              value={formik.values[field]}
              readonly={readonly}
               onChange={onChange}
              onBlur={(e) => formik?.handleBlur(e)}
              maxlength={maxlength}
             // type={type}
              errorMessage={
                hasFieldError
                  ?  formik.errors[field]
                  : ""
              }
            />
          );
           case "date":
          return (
            <DateField
              className={otherConfig?.className}
              fieldFlexWidth={fieldFlexWidth}
              label={label}
              required={required}
              uid={uid}
              name={field}
              value={formik.values[field]}
              readonly={readonly}
            //  onChange={onChange}
              errorMessage={
                hasFieldError
                  ?  formik.errors[field]
                  : ""
              }
              {...otherConfig}
            />
          );
        case "checkbox":
          return (
            <>
             <CheckBox field={''} formik={formik}/>
            </>

          );
        case "jsx":
          return <>{otherConfig.element &&  otherConfig.isJSX ?  <otherConfig.element/> : otherConfig.element}</>;
        default:
          return <></>;
      }
    };
    return getInputElFromConfig(field, formik);
})
