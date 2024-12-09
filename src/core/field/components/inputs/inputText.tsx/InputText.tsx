import { FormCreator } from '../../../../form/formyBase/Formy.creator'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'

interface IInputTextProps {
    formId: string
    fieldName: string
}

const { getFieldHook, getForm } = FormCreator
const useField = getFieldHook()

const InputText = ({ formId, fieldName }: IInputTextProps) => {
    const currentForm = getForm(formId)
    const { field, flags } = useField(fieldName, currentForm?.fields)
    console.log('InputText RENDER')
    return (
        <FieldSet
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <input data-class="base-input" {...field?.register()} ref={field?.ref()} />
        </FieldSet>
    )
}
export default InputText
