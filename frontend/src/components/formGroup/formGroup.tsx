import React, { useMemo } from 'react'
import InputForm from '../inputForm/inputForm';
import type { FieldConfig } from '../types';
import { Form, Formik, type FormikHelpers, type FormikValues } from 'formik';
import { FormProvider } from '../context/formikContext';




interface FormGroupConfig {
  id: string;
  fields: FieldConfig[];
}

interface FormGroupProps {
  config: FormGroupConfig;
}

const FormGroup: React.FC<FormGroupProps> = ({ config }) => {
  
  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    config.fields.forEach(field => {
      values[field.field] = field?.value || '';
    });
    return values;
  }, [config.fields]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => { }}
      >
        {formik => (
          <FormProvider value={formik}>
            <Form id={config.id} className="space-y-4">
              {config.fields.map(field => (
                <InputForm inputField={field} />
              ))}
              {/* <button type="submit">Submit</button> */}
            </Form>
          </FormProvider>
        )}
      </Formik>
    </>
  )
}

export default FormGroup
