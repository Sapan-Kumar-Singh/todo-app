import { memo, useCallback, useEffect } from 'react'
import './gridIcon.scss'

export const GridIcon = memo((props: any) => {
  const {data,onClickHandler,customClassName,showOnHover,onMouseEnter,onMouseLeave,children,id,...otherProps} = props
  const onCellClickHandler = useCallback((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.preventDefault()
     e.nativeEvent.stopPropagation()
    onClickHandler?.({ data: data,event: e })
    return false
  }, [onClickHandler])

 

  return (
    <>
      <div
        className={`cursor-pointer  min-width flex justify-center !h-full items-center cursor pointer-auto  ${showOnHover ? 'hover-icon' : ''} ${
          customClassName ? props.customClassName : ''
        }`}
        id={id}
        {...otherProps}
        onClick={onCellClickHandler} onMouseEnter={(e)=>onMouseEnter && onMouseEnter(e)} onMouseLeave={(e)=>onMouseLeave && onMouseLeave(e)}
      >
        <>{children}</>
      </div>
    </>
  )
})
