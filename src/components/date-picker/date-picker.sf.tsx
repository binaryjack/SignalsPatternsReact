import { INDate } from '@core/framework/schema/descriptor/i-n-date'

import { conventions } from '../context/conventions/conventions'

import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'

import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { DatePickerFormatsEnum } from './core/date-picker.types'
import { formatDate } from './core/formatters/format-date'
import DatePickerContentDrawer from './date-picker.drawer.content'

interface DatePickerSFProps {
    fieldName: string
    separator?: string
    dataFormat?: DatePickerFormatsEnum
    displayFormat?: DatePickerFormatsEnum
}

export const DatePickerSF = ({
    fieldName,
    separator = conventions.dataTypes.date.separator,
    dataFormat = conventions.dataTypes.date.formatValue,
    displayFormat = conventions.dataTypes.date.formatDisplay
}: DatePickerSFProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        instance?.input?.valueManager?.setValue(instance, startDate)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            setToggleState('open')
        },
        onDeleteCallback: () => {
            instance?.input?.clear()
        }
    })

    useFieldDefaultValue(instance?.input)

    return (
        <FieldSet
            inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                instance?.input?.focus()
            }}
            itemsChildren={
                <DatePickerContentDrawer
                    id={instance?.input?.name ?? 'NOT-DEFINED!'}
                    onSelectDate={onSelectDate}
                    separator={separator}
                    dataFormat={dataFormat}
                    displayFormat={displayFormat}
                    defaultDate={instance?.input?.defaultValue as string}
                />
            }
            itemsDrawerHeight={conventions.components.drawer.height}
            itemsDrawerWidth={conventions.components.drawer.width}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={flags.focus}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                autoComplete="off"
                data-separator={separator}
                date-format={dataFormat}
                display-format={displayFormat}
                onKeyDown={handleKeyDown}
            />
        </FieldSet>
    )
}
