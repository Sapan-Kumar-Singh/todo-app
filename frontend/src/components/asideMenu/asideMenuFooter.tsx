import { VARIANT } from "../../helper/enum";
import Button from "../button";

interface AsideMenuFooterType{
    hideSave?:boolean;
    hideClose?:boolean;
    onSave?:(evt?:any)=>void;
    onClose?:(evt?:any)=>void;
}
const AsideMenuFooter = ({hideSave=false,hideClose=false,onSave,onClose}:AsideMenuFooterType) => {
  return (
    <>
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between mt-auto ">
          {!hideSave && <Button onClick={onSave}>Save</Button>}
          {!hideClose && <Button variant={VARIANT.OUTLINED} onClick={onClose}>Close</Button>}
        </div>
    </>
  )
}

export default AsideMenuFooter
