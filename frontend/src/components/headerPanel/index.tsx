import React from 'react'
import { headerTitle, Variant } from '../../helper/enum'
import SearchBox from '../searchBox'
import { Button } from '../button'
import CreateIcon from '../Icons/createIcon'

const HeaderPanel = ({handleCreate,handleSave}:any) => {

  return (
    <>
        <div className='bg-white sticky top-0 z-10 p-4 shadow-sm flex flex-col items-center '>
          <div className="text-gray font-bold text-lg mt-4">{headerTitle.title}</div>
        <div className='flex  items-center'>
          <SearchBox />
          <Button
            data-tooltip-id="global-tooltip"
            data-tooltip-content="Create todo"
            onClick={handleCreate}
            variant={Variant.Empty}
            className='btnHover'
            type='button'
          >
            <CreateIcon className="w-6 h-6 text-primary" />
          </Button>

             <Button
            onClick={handleSave}
            variant={Variant.Bordered}
            className='btnHover'
            type='button'
            disabled={false}
          >
            <span>Save</span>
          </Button>
        </div>
        </div>
    </>
  )
}

export default HeaderPanel
