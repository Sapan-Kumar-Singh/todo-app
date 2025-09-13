import type { FormikContextType } from "formik";
import React, { createContext, useContext } from "react";

const formContext=createContext<FormikContextType<any> | null>(null);

export const useForm = () => {
    const context = useContext(formContext);
    if (!context) {
        throw new Error('useFormContext must be used within FormProvider');
    }
    return context;
}

export const FormProvider=({children,value}:any)=>{
    return <formContext.Provider value={value}>{children}</formContext.Provider>
}