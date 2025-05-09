import { IFieldInput } from '@core/field-engine/core/input-base/field-input-base-types'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'

interface IRadioInputOptionProps {
    field: IFieldInput
    option: IOptionItem
}

const RadioInputOption = ({ field, option }: IRadioInputOptionProps) => {
    const handleDelete = () => {
        field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    return (
        <div className={`radio-item-group`}>
            <input
                tabIndex={0}
                id={option.id}
                data-sequence-id={option.sequenceId}
                className="base-radio "
                type="radio"
                name={field.name}
                value={option.value}
                {...field.registerOption()}
                ref={(r) => field.refOption(r)}
                onKeyDown={handleKeyDown}
            />
            <label
                htmlFor={option.id}
                className={`ml-2 cursor-pointer select-none`}
                {...field.registerLabel(option.id)}
            >
                {option.text}
            </label>
        </div>
    )
}

export default RadioInputOption
