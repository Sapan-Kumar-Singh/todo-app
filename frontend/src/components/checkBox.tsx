import React, { useEffect, useState, type ChangeEvent } from 'react'

interface CheckBoxType {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

const CheckBox = ({ checked, onChange }: CheckBoxType) => {
    const [isChecked, setIsChecked] = useState(checked);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        onChange && onChange(newChecked)
    }

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])
    return (
        <>

            <input id="default-checkbox" type="checkbox" onChange={handleChange} checked={isChecked} value="" className="w-4 h-4 text-blue-600 outline-none bg-gray-100 border-gray-300 rounded-sm cursor-pointer " />
        </>
    )
}

export default CheckBox
