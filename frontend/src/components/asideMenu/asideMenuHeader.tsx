import BackIcon from "../Icons/backIcon"

interface AsideMenuHeaderType {
    title?: string;
    onclick:()=>void;
}

const AsideMenuHeader = ({ title = "Aside menu",onclick }: AsideMenuHeaderType) => {
    return (
        <div className="relative px-4 py-3 border-b border-gray-200 
                    bg-gradient-to-r from-white via-gray-50 to-white
                    shadow-md rounded-t-xl flex justify-between items-center">

            <div className="text-lg font-semibold text-darkgrey">
                {title}
            </div>

            <div data-tooltip-id="global-tooltip" data-tooltip-content="Back" onClick={onclick}>
                <BackIcon className = "w-6 h-6 text-primary cursor-pointer"/>
            </div>

        </div>
    )
}

export default AsideMenuHeader