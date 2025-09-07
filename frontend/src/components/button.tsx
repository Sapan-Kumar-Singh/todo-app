import type { VARIANT } from "../helper/enum";

interface ButtonProps {
  title?: string;
  variant?: keyof typeof VARIANT;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const buttonVariant:Record<keyof typeof VARIANT, string> = {
  FILLED:
    "bg-blue-600 text-white rounded-md shadow-sm " +
    "hover:bg-blue-700 active:bg-blue-800 " +
    "disabled:bg-gray-400 ",

  OUTLINED:
    "border-2 border-blue-600 text-blue-600 rounded-md " +
    "hover:bg-blue-50 active:bg-blue-100 " +
    "disabled:border-gray-300 disabled:text-gray-400",

  TEXT:
    "text-blue-600 rounded-md " +
    "hover:bg-blue-50 active:bg-blue-100 " +
    "disabled:text-gray-400 ",
} as const;

const Button = ({ title, variant='FILLED', onClick, disabled=false, children }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-1  cursor-pointer font-medium transition-all duration-200 ${buttonVariant[variant]} ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title} {children}
    </button>
  );
};

export default Button;
