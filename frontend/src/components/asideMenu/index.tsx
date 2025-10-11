import type React from "react";
import AsideMenuFooter from "./asideMenuFooter";
import AsideMenuHeader from "./asideMenuHeader";

interface AsideMenuProps {
  isOpen: boolean;
  title?: string;
  setIsOpen: (open: boolean) => void;
  hideSave?: boolean;
  hideClose?: boolean;
  onSave?: (evt?:any) => void;
  onClose?:(evt?:any)=>void;
  width?: string;
  children: React.ReactNode;
}

const AsideMenu = ({ isOpen, setIsOpen, title, hideSave, hideClose, onSave,onClose, width = '400', children }: AsideMenuProps) => {

  const handleClose = (evt?:any) => {
    setIsOpen(false);
    onClose && onClose(evt)

  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-400/50 transition-opacity duration-300 z-10
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl flex flex-col z-10
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: `${width}px` }}
      >
        <AsideMenuHeader title={title} onclick={handleClose} />
        {/* Body */}
         <div className="p-2"> {children}</div>

        <AsideMenuFooter hideSave={hideSave} hideClose={hideClose} onSave={onSave} onClose={handleClose} />
      </div>
    </>
  );
};

export default AsideMenu;
