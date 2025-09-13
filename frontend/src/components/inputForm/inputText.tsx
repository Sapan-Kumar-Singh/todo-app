
interface InputProps {
  headerName: string;
  field: string;
  required?: boolean;
  value?: string;
   onChange?: () => void;
}
const Input = ({ headerName, field, required,value,onChange }: InputProps) => {
  return (
  <>
    <div className="mt-4">
      <label
        htmlFor={field}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {headerName}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={field}
        name={field}
        type="text"
        onChange={onChange}
        value={value}
        className="w-full py-px text-sm bg-gray-50 border-b border-blue-400 focus:border-blue-600 focus:outline-none text-gray-900"
      />

    </div>
  </>
  )
}

export default Input
