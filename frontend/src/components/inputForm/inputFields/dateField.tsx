import { useRef, useState, type ChangeEvent } from 'react'
import type { FormField } from '../../types';
import classNames from 'classnames';

interface DateInput {
  fieldFlexWidth?: string;
  label?: FormField["label"];
  uid?: string;
  name: string;
  type: FormField["type"];
  readonly?: FormField['readonly'];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onBlur?: (e: any) => void;
  required?: FormField["required"];
  maxlength?: FormField["maxlength"];
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  insideGrid?:boolean;
}
const DateField = ({
  className,
  fieldFlexWidth,
  label,
  required,
  uid,
  name,
  value,
  readonly,
  onChange,
  placeholder = '',
  errorMessage,
  disabled,
  insideGrid=false
}: DateInput) => {
   
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null)
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsFocused(false);
    if (!readonly && value !== "") {
      // const fixedVal = decimalConversion(value)?.toFixed(fractionDigits);
      if (onChange)
        onChange({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO: fix types
          target: {
            name,
            value: value
          },
        });
    }
  };


  return (
    <div
      className={`my-[5px]  ${className ? className : ""}`}
      style={{ width: fieldFlexWidth }}
    >
      <div
        className={classNames(
          "flex flex-col gap-[4px] max-w-full w-full 7xl:w-[500px]"
        )}
        data-pace-input-field-id={name}
      >
        <div className="inline-flex gap-[5px] items-center">
          {label && (
            <label
              htmlFor={uid}
              className={classNames(
                "inline-flex items-center text-form-default text-[12px] font-semibold",
                {
                  "!text-form-primary": isFocused,
                  "!text-form-error": !!errorMessage,
                }
              )}
            >
              {label}
              {required && (
                <span
                  className={`${readonly ? "text-form-disabled-text" : "text-red-600"
                    }`}
                >
                  *
                </span>
              )}
            </label>
          )}
        </div>
        <input
          id={uid}
          aria-labelledby={uid}
          name={name}
          ref={inputRef}
          placeholder={placeholder}
          onChange={onChange}
          onInput={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            handleBlur(e);
          }}
          value={value}
          type={'date'}
          disabled={disabled || readonly}
           className={classNames(
                     "border-t-0 border-l-0 border-r-0   pb-2 text-xs font-medium text-lightblack outline-none !bg-transparent",
                     {
              "border-b border-form-default":!insideGrid,
              "border-b border-form-error": !!errorMessage,
              "border-b border-form-primary": isFocused,
              "border-b border-form-disabled":!insideGrid,
              "!text-form-disabled-text !cursor-not-allowed":
                readonly,
            }
                   )}
        />
        {!!errorMessage && (
          <div className="text-form-error font-bold text-[10px]">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default DateField
