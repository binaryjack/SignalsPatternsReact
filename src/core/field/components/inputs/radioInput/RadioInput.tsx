import { useRef } from 'react'

import useFormyContext, { useField } from '../../../../form/components/Formy/Formy.context'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'
import RadioInputOption from './RadioInput.option'

interface IRadioInputProps {
    fieldName: string
}

const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const optionRefs = useRef<HTMLInputElement[]>([])
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
            <ul>
                {field?.options?.map((option) => {
                    return (
                        <RadioInputOption
                            key={`${field.id}-${option.id}`}
                            field={field}
                            option={option}
                        />
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
