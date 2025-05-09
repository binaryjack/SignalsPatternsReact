import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { Button } from '../button/button'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import { Portal } from '../portals/portals'
import ValidationResultComponent from '../validation-result/validation-result'
import './password.css'
// filepath: e:/Sources/SignalsPatternsReact/src/components/password/Password.tsx

interface IPasswordProps {
    fieldName: string
}

const Password = ({ fieldName }: IPasswordProps) => {
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleDelete = () => {
        instance?.field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance?.field)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const fieldId = instance?.field?.name ?? conventions.IdIsEmpty()

    return (
        <FieldSet
            inputId={fieldId}
            label={instance?.field?.label}
            type="password"
            flags={flags}
            onClick={() => {
                instance?.field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.field?.validationResults ?? []}
                />
            }
            onClear={() => instance?.field?.clear()}
        >
            <div className="relative flex items-center w-full">
                <input
                    tabIndex={0}
                    data-class="base-input "
                    {...instance?.field?.register()}
                    ref={(r) => instance?.field?.ref(r)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="password-input"
                />

                <Portal
                    id={fieldId}
                    slotName={'toggle-password'}
                    children={
                        <Button
                            id={`${fieldId}-clear-field-btn`}
                            title={'toggle password visibility'}
                            variantProperties={{
                                rounded: true,
                                size: 'md',
                                width: '2em',
                                height: '2em',
                                className: 'ml-1'
                            }}
                            onClickCallback={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                        </Button>
                    }
                />
            </div>
        </FieldSet>
    )
}

export default Password
