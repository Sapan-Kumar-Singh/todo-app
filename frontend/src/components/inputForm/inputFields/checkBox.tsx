
import type { ChangeEvent } from 'react';
import type { FormField } from '../../types';

interface CheckBoxType {
    label?: FormField["label"];
    field: FormField['field'];
    readonly?: boolean;
    formik?: any;
    value?:any
    onChange?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
     onBlur?: (e: any) => void;
}



const CheckBox = ({ label, field, readonly=false, formik ,value,onChange,onBlur}: CheckBoxType) => {
    
    return (
        <div

        >
            <label
                className="form-checkmarkvalue flex items-center justify-center"
                htmlFor={field}
                id={field}
            >
                <input
                    id={field}
                    aria-labelledby={`${field}-label`}
                    type="checkbox"
                    className="checkBox"
                    name={field}
                   // checked={['Y', true].includes(formik?.values?.[field] || value)}
                    onChange={(e) => {
                       if(readonly) return;
                       const newValue = e.target.checked ? 'Y' : 'N';
                       formik.setFieldValue(field, newValue);
                      onChange && onChange({ ...e, target: { ...e.target, value: newValue } });
                    }}
                     onBlur={(e) => {
                      onBlur && onBlur?.(e);
                    }}
                    aria-checked={['Y', true].includes(formik?.values?.[field] || value)}
                />
                <span className="form-checkmark"></span>
                {label}
            </label>
        </div>
    )
}

export default CheckBox
