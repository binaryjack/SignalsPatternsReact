import { SlMagnifier } from 'react-icons/sl'

import { IOptionItem } from '../../dependency/schema/optionsSchema/options.scheme.types'
import DelayInput from '../delayInput/DelayInput'

import { useDrawerContext } from '../drawer/Drawer.context'
import SelectDrawerOptions from './Select.drawer.options'

interface ISelectDrawerUIProps {
    items: IOptionItem[]

    filterTriggerDelay: number
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
    selectedItemId: number
    onFilterItems: (value: string) => void
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectDrawerContentUI = ({
    items,
    handleKeyDown,
    onHandleSelectItem,
    selectedItemId,
    filterTriggerDelay,
    onFilterItems,
    onClearFilter
}: ISelectDrawerUIProps) => {
    const { drawerHeight, drawerWidth, drawerOpenState } = useDrawerContext()

    return (
        <div
            className={`select-container overflow-hidden`}
            onKeyDown={handleKeyDown}
            style={{ width: drawerWidth, height: drawerHeight }}
        >
            <div className={` flex flex-row justify-center items-center w-full mt-1 mb-1 `}>
                <i className={`flex icon-box mr-1 h-6`}>
                    <SlMagnifier />
                </i>
                <DelayInput
                    canGotFocus={drawerOpenState === 'open'}
                    classNames={`flex input-sm-p mr-1 w-full`}
                    delay={filterTriggerDelay}
                    onChangeCallback={onFilterItems}
                    onClearCallback={onClearFilter}
                />
            </div>

            <SelectDrawerOptions
                options={items}
                onHandleSelectItem={onHandleSelectItem}
                selectedItemId={selectedItemId}
            />
        </div>
    )
}
export default SelectDrawerContentUI
