import React, { forwardRef, useMemo } from "react";
import { SizeEnum, Variant } from "../../helper/enum";



const colorClasses={
    [Variant.Filled]: "shadow border border-transparent bg-primary enabled:hover:bg-primaryHover text-white",
    [Variant.Bordered]: "shadow border text-primary border-primary btnHover",
    [Variant.Empty] : "text-primary"
}

const fontClasses={
    [SizeEnum.Small]:'text-[12px]',
    [SizeEnum.Medium]:'text-[14px]',
    [SizeEnum.Large]: 'text-[16px]',
}

export type ButtonProps={
  variant?:Variant;
  type:'button' | 'submit';
  size?:SizeEnum;
  disabled?:boolean;
  onClick?:(e?:any)=>void;
  children:React.ReactNode;
  className?:string;
  id?:string;
  ariaLabel?:string
}

export const Button=forwardRef<HTMLButtonElement,ButtonProps>(({
    variant=Variant.Filled,
    onClick,
    children,
    disabled=false,
    size=SizeEnum.Medium,
    className,
    type='button',
    id,
    ariaLabel,
    ...others
},ref)=>{
     
    const btnColor=useMemo(
          ()=>colorClasses[variant] || colorClasses[Variant.Empty]
    ,[variant])

    const fontSize=useMemo(
        ()=> fontClasses[size] || fontClasses[SizeEnum.Medium]
    ,[size])
    return (
        <button
        ref={ref}
        type={type}
        className={`p-2 mx-1 sm:py-3 h-[36px] sm:pl-[10px] sm:pr-[10px] items-center flex justify-center font-bold ${btnColor} ${fontSize} px-3.5 rounded ${
            disabled && "disabled:opacity-25 hover:bg-none disabled:cursor-not-allowed "
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
        id={id || ""}
        aria-label={ariaLabel}
        {...others}
        >
            {children}
        </button>
    )
}) 