import { SizeEnum, Variant } from "../../helper/enum";
import { Button } from "../button";

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
          {!hideSave && <Button type={"button"} onClick={onSave} size={SizeEnum.Small} className="hover:cursor-pointer" ><p>Save</p></Button>}
          {!hideClose && <Button variant={Variant.Bordered} type={"button"} onClick={onClose} size={SizeEnum.Small} ><p>Close</p></Button>}
        </div>
    </>
  )
}

export default AsideMenuFooter
