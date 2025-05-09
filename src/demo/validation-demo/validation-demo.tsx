import { conventions } from '@components/context/conventions/conventions'
import FormyForm from '@components/formy/formy.form'
import InputText from '@components/input-text/input-text'
import { FieldInputCreator } from '@core/field-engine/core/input-base/field-input.creator'
import { Formy } from '@core/formy-base/formy-base'
import { IFormy } from '@core/formy-base/formy-base.types'
import { newFieldError, newFieldGuide } from '@core/framework/errors'
import { EventsType } from '@core/framework/events/events.types'
import { _intNotificationTracker } from '@core/managers/notification-manager/notification-manager'
import { NotifierDebugUi } from '@core/managers/notification-manager/notifier-debug-ui/notifier-debug-ui'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'
import { useEffect, useState } from 'react'

const defaultValidation = {
    max: {
        max: 100,
        error: `This field requires a value that must not be greater than ${conventions.tokens.validationDataToken1}!`,
        guide: `please enter a value less than ${conventions.tokens.validationDataToken1}.`
    },
    min: {
        min: 0,
        error: `This field requires a value that must not be less than ${conventions.tokens.validationDataToken1}!`,
        guide: `please enter a value greater than ${conventions.tokens.validationDataToken1}.`
    },
    maxLength: {
        maxLength: 50,
        error: `This field requires a value with a length not exceeding ${conventions.tokens.validationDataToken1} characters!`,
        guide: `please enter a value with fewer than ${conventions.tokens.validationDataToken1} characters.`
    },
    minLength: {
        minLength: 5,
        error: `This field requires a value with a length of at least ${conventions.tokens.validationDataToken1} characters!`,
        guide: `please enter a value with more than ${conventions.tokens.validationDataToken1} characters.`
    },
    pattern: {
        pattern: '',
        error: `This field requires a value matching the specified pattern!`,
        guide: `please enter a value that matches the specified pattern.`
    },
    requiredData: {
        required: false,
        error: `This field is required!`,
        guide: `please provide a value for this field.`
    }
}

const FieldInputValidationSandbox = () => {
    const [validationOptions, setValidationOptions] =
        useState<IValidationOptions>(defaultValidation)

    const [internalForm, setInternalForm] = useState<IFormy | null>(null)

    const [validationTriggerMode, setValidationTriggerMode] = useState<EventsType[]>([
        'onBlur',
        'onChange'
    ])

    const field = FieldInputCreator.newFieldFromDescriptor({
        id: 1,
        name: 'sandboxField',
        label: 'Sandbox Field',
        type: 'text',
        value: '',
        validationOptions: validationOptions,
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true,
        objectValue: null,
        defaultValue: '',
        errors: [],
        guides: [],
        options: []
    })

    useEffect(() => {
        const validationDemoForm = new Formy('validation-demo-form', _intNotificationTracker)
        validationDemoForm.setValidationTriggerMode(validationTriggerMode)
        field.setValidationTriggerMode(validationTriggerMode)
        validationDemoForm.addFields(field)
        setInternalForm(validationDemoForm)
    }, [])

    useEffect(() => {
        if (!internalForm) return

        internalForm?.setValidationTriggerMode(validationTriggerMode)
    }, [internalForm, validationTriggerMode])

    const handleValidationOptionChange = (key: keyof IValidationOptions, value: any) => {
        setValidationOptions((prev) => ({
            ...prev,
            [key]: { ...prev[key], ...value }
        }))
        field.initializeValidation({
            ...field,
            validationOptions: { ...validationOptions, [key]: value }
        })
    }

    const handleTriggerModeChange = (mode: EventsType[]) => {
        setValidationTriggerMode(mode)
        field.setValidationTriggerMode(mode)
    }

    const handleSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <>
            {internalForm && (
                <FormyForm formy={internalForm} onSubmit={handleSubmit}>
                    <div className="sandbox-container flex flex-row p-1 w-full h-full">
                        <div className="sandbox-container flex flex-col p-1 w-full h-full">
                            <div className="validation-controls w-full">
                                <div className="flex px-1 flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="max-v">Max:</label>{' '}
                                        <input
                                            id="max-v"
                                            type="number"
                                            value={validationOptions.max?.max ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('max', {
                                                    max: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.max,
                                                        `This field requires a value that must not be greater than ${parseInt(e.target.value, 10)}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.max,
                                                        `please enter a value less than ${parseInt(e.target.value, 10)}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2  flex-col w-full">
                                        <label htmlFor="min-v">Min:</label>{' '}
                                        <input
                                            id="min-v"
                                            type="number"
                                            value={validationOptions.min?.min ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('min', {
                                                    min: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.min,
                                                        `This field requires a value that must not be less than ${parseInt(e.target.value, 10)}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.min,
                                                        `please enter a value greater than ${parseInt(e.target.value, 10)}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-1 flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="maxLength-v">Max Length:</label>{' '}
                                        <input
                                            id="maxLength-v"
                                            type="number"
                                            value={validationOptions.maxLength?.maxLength ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('maxLength', {
                                                    maxLength: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.maxLength,
                                                        `This field requires a value with a length not exceeding ${parseInt(e.target.value, 10)} characters!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.maxLength,
                                                        `please enter a value with fewer than ${parseInt(e.target.value, 10)} characters.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="minLength-v">Min Length:</label>{' '}
                                        <input
                                            id="minLength-v"
                                            type="number"
                                            value={validationOptions.minLength?.minLength ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('minLength', {
                                                    minLength: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.minLength,
                                                        `This field requires a value with a length of at least ${parseInt(e.target.value, 10)} characters!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.minLength,
                                                        `please enter a value with more than ${parseInt(e.target.value, 10)} characters.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-2  flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="pattern-v">Pattern:</label>{' '}
                                        <input
                                            id="pattern-v"
                                            type="text"
                                            value={validationOptions.pattern?.pattern ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('pattern', {
                                                    pattern: e.target.value,
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.custom,
                                                        `This field requires a value matching the pattern: ${e.target.value}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.custom,
                                                        `please enter a value that matches the pattern: ${e.target.value}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2 flex-row w-full items-center justify-center">
                                        <label htmlFor="required-v">Required:</label>
                                        <input
                                            className="mx-2"
                                            id="required-v"
                                            type="checkbox"
                                            checked={
                                                validationOptions.requiredData?.required || false
                                            }
                                            onChange={(e) =>
                                                handleValidationOptionChange('requiredData', {
                                                    required: e.target.checked
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-2  flex-col w-full">
                                    <label htmlFor="validationTriggerMode-v">
                                        Validation Trigger Mode:
                                    </label>{' '}
                                    <select
                                        id="validationTriggerMode-v"
                                        multiple
                                        value={validationTriggerMode}
                                        onChange={(e) =>
                                            handleTriggerModeChange(
                                                Array.from(
                                                    e.target.selectedOptions,
                                                    (option) => option.value as EventsType
                                                )
                                            )
                                        }
                                    >
                                        <option value="onBlur">onBlur</option>
                                        <option value="onChange">onChange</option>
                                        <option value="onSubmit">onSubmit</option>
                                        <option value="onLoad">onLoad</option>
                                        <option value="reset">reset</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-container w-full">
                                <InputText fieldName="sandboxField" />
                            </div>
                        </div>
                        <div className="sandbox-container flex flex-col p-1 w-full h-full">
                            <NotifierDebugUi internalNotifierInstance={_intNotificationTracker} />
                        </div>
                    </div>
                </FormyForm>
            )}
        </>
    )
}

export default FieldInputValidationSandbox
