interface TeatAreaType {
  headerName?: string;
  field?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}

const TextArea = ({ headerName, field, required, disabled = false, value}: TeatAreaType) => {
  return (
    <div className="mt-4">
      {headerName &&  <label
        htmlFor={field}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {headerName}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>}
      <textarea
        id={field}
        name={field}
        disabled={disabled}
        className={`w-full text-sm text-gray-900 text-pretty p-2 ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 rounded' : 'bg-gray-50 border-b border-blue-400 focus:border-blue-600 focus:outline-none'}`}
        rows={2}
        cols={50}
        value={value}
      />
      
    </div>
  )
}

export default TextArea
