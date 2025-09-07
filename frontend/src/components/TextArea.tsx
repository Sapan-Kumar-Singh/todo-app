interface TeatAreaType{
  disabled?:boolean;
  content:string;
}

const TextArea = ({disabled=false,content}:TeatAreaType) => {
  return (
    <>
     <textarea disabled={disabled} className={`text-pretty ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 rounded p-2' :''}`} rows={2} cols={50}>{content}</textarea>
    </>
  )
}

export default TextArea
