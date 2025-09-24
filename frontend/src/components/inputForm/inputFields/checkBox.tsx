
import type { FormField } from '../../types';

interface CheckBoxType {
    fieldFlexWidth?: string;
    label?: FormField["label"];
    field: FormField['field'];
    readonly?: boolean;
    formik?: any;
    value?:any
}



const CheckBox = ({ label, field, readonly, formik ,value}: CheckBoxType) => {


    return (
        <div

        >
            <label
                className="form-checkmarkvalue flex items-center justify-center"
                htmlFor={`${field}-checkbox`}
                id={`${field}-label`}
            >
                <input
                    id={`${field}-checkbox`}
                    aria-labelledby={`${field}-label`}
                    type="checkbox"
                    className="checkBox"
                    name={field}
                    // onChange={checkBoxChange}
                    value={formik?.values?.[field] || value}
                    checked={['Y', true].includes(formik?.values?.[field] || value)}
                    onClick={(e) => {
                       if(readonly) return;
                        return true;
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
