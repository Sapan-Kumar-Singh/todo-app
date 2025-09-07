import type React from "react";
import AsideMenuFooter from "./asideMenuFooter";
import AsideMenuHeader from "./asideMenuHeader";

interface AsideMenuProps {
  isOpen: boolean;
  title?: string;
  setIsOpen: (open: boolean) => void;
  hideSave?: boolean;
  hideClose?: boolean;
  onSave?: () => void;
  width?: string;
  children: React.ReactNode;
}

const AsideMenu = ({ isOpen, setIsOpen, title, hideSave, hideClose, onSave, width = '400', children }: AsideMenuProps) => {

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-400/50 transition-opacity duration-300 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: `${width}px` }}
      >
        <AsideMenuHeader title={title} onclick={onClose} />
        {/* Body */}
        {children}

        <AsideMenuFooter hideSave={hideSave} hideClose={hideClose} onSave={onSave} onClose={onClose} />
      </div>
    </>
  );
};

export default AsideMenu;
