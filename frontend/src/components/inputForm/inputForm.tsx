
import { useForm } from '../context/formikContext';
import type { FieldConfig } from '../types';
import Input from './inputText';
import TextArea from './TextArea';
interface InputFormProps {
  inputField: FieldConfig;
}

const InputForm:React.FC<InputFormProps> = ({inputField}) => {
   
    const {headerName,field,type,required}=inputField;
      const formContext=useForm();
      switch (type) {
        case 'text':
             return <Input 
             headerName={headerName} 
             field={field} 
             required={required} 
             value={formContext?.values[field]}
             />;
        case 'textarea' :
            return <TextArea 
               headerName={headerName} 
               field={field}
               required={required} 
               value={formContext?.values[field]}
               />; 
        default : return;        
      }
  
}

export default InputForm
