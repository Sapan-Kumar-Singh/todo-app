import classNames from "classnames";
import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import type { FormField } from "../../types";

export interface TextAreaProps {
  readonly?: FormField['readonly'];
  label: FormField["label"];
  required?: FormField["required"];
  value?: string;
  uid: string;
  hasUnsavedChange?: boolean;
  field: FormField["field"];
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => Promise<void>;
  onBlur?: (e: any) => void;
  className?: string;
  maxlength?: FormField["maxlength"];
  errorMessage?: string;
  rows?: number;
  resizeable?: boolean;
  fieldFlexWidth?: string;
  spellCheck?: "true" | "false";
  placeholder?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  onChange,
  readonly=false,
  fieldFlexWidth,
  value,
  label,
  uid,
  required,
  field: name,
  maxlength,
  errorMessage,
  onBlur,
  className,
  placeholder,
  spellCheck = "true",
  rows =1,
}: TextAreaProps, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // const hasUnSavedChangesIcon = useMemo(() => {
  //   return hasUnsavedChange && isShowingIcon === undefined ? <ChangeIcon /> : null;
  // }, [hasUnsavedChange, isShowingIcon]);



  const errorId = `${uid}-error`;

  return (
    <div
      className={classNames(className, "my-[5px] h-auto ")}
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
              id={uid}
              htmlFor={uid}
              className={classNames(
                "inline-flex items-center text-form-default text-[12px] font-medium",
                {
                  "text-form-primary": isFocused,
                  "text-form-error": !!errorMessage,
                }
              )}
            >
              {label}
              {required && (
                <span className={readonly ? "text-form-disabled-text" : "text-red-600"}>
                  *
                </span>
              )}
            </label>
          )}
        </div>
        <textarea
          id={uid}
          name={name}
          ref={ref || textareaRef}
          spellCheck={spellCheck}
          placeholder={placeholder}
          rows={rows}
          autoComplete="off"
          readOnly={readonly}
          disabled={readonly}
          onChange={onChange}
          onInput={onChange}
          aria-labelledby={uid}
          aria-describedby={errorMessage ? errorId : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          value={value}
          maxLength={maxlength ? maxlength : undefined}
          className={classNames(
            "leading-[1rem] resize-y border-t-0 border-l-0 border-r-0 border-b border-b-form-default pb-[5px] text-[14px] font-medium outline-none !bg-transparent",
            {
              "border-b-formError": !!errorMessage,
              "border-b-form-primary": isFocused,
              "border-b-form-disabled !text-form-disabled-text !cursor-not-allowed":
                readonly,
            }
          )}
        />
        {!!errorMessage && (
          <div id={errorId} className="text-form-error font-medium text-[10px]">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
});