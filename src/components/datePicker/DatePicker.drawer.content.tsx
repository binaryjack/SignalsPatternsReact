import { useCallback, useEffect, useState } from 'react'

import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'

import useKeyBindings from '../../core/hooks/useKeyBindings'
import { useDrawerContext } from '../drawer/components/Drawer.context'
import { DatePickerContext, IDatePickerContext } from './components/DatePicker.context'
import { computeDaysGrid } from './core/computed/computeDaysGrid'
import { computeMonthsGrid } from './core/computed/computeMonthsGrid'
import { computeYearsGrid } from './core/computed/computeYearsGrid'
import { createCell } from './core/constructors/createCell'
import { DateObject } from './core/DateObject.object'
import {
    DatePickerGridModeType,
    DatePickerOutputFormatType,
    DatePickerSelectionModeType
} from './core/DatePicker.types'
import { getNextDate } from './core/getters/getNextDate'
import { getPreviousDate } from './core/getters/getPreviousDate'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'
import DatePickerDrawerUI from './DatePicker.drawer.content.UI'

interface IDatePickerDrawerProps {
    id: string
    separator?: string
    defaultDate?: INDate | Date | string
    dataFormat?: DatePickerOutputFormatType
    displayFormat?: DatePickerOutputFormatType
    onSelectDate: (startDate?: INDate, endDate?: INDate) => void
    defaultSelectionMode?: DatePickerSelectionModeType
    defaultGridMode?: DatePickerGridModeType
    showFooter?: boolean
    width?: string
    height?: string
}

/**
 * The `DatePickerContentDrawer` component is a React functional component that provides
 * a date picker interface within a drawer. It allows users to select dates, navigate
 * through different grid modes (day, month, year), and manage date selections.
 *
 * @param {IDatePickerDrawerProps} props - The properties for the component.
 * @param {string} props.id - The unique identifier for the date picker drawer.
 * @param {Date | string | INDate} [props.defaultDate] - The default date to initialize the date picker.
 * @param {(startDate: INDate | undefined, endDate: INDate | undefined) => void} props.onSelectDate - Callback function triggered when a date is selected.
 * @param {boolean} [props.showFooter] - Determines whether the footer is displayed in the drawer.
 * @param {string} [props.separator='-'] - The separator used for date formatting.
 * @param {string} [props.dataFormat] - The format used for parsing date strings.
 * @param {string} [props.displayFormat] - The format used for displaying dates.
 * @param {'single' | 'range'} [props.defaultSelectionMode='single'] - The default selection mode for the date picker.
 * @param {'DAY' | 'MONTH' | 'YEAR'} [props.defaultGridMode='DAY'] - The default grid mode for the date picker.
 * @param {string} [props.width='100%'] - The width of the drawer.
 * @param {string} [props.height='100%'] - The height of the drawer.
 *
 * @property {string} selectionMode - Determines how dates can be selected in the date picker.
 * - `'single'`: Allows the user to select a single date.
 * - `'range'`: Allows the user to select a range of dates (start and end dates).
 * This property is used to configure the behavior of the date picker and is shared
 * across child components via the `DatePickerContext`.
 *
 * @returns {JSX.Element} The rendered `DatePickerContentDrawer` component.
 *
 * @remarks
 * - The component uses a context (`DatePickerContext`) to manage and share state across
 *   its child components.
 * - The `jumpToNow` and `jumpToSelection` functions allow quick navigation to the current
 *   date or the selected date, respectively.
 * - The `updateGrid` function dynamically updates the grid data based on the current grid
 *   mode and internal date.
 * - The component supports keyboard navigation through the `useKeyBindings` hook.
 *
 * @example
 * ```tsx
 * <DatePickerContentDrawer
 *   id="my-date-picker"
 *   defaultDate={new Date()}
 *   onSelectDate={(startDate, endDate) => console.log(startDate, endDate)}
 *   showFooter={true}
 *   separator="/"
 *   displayFormat="MM/dd/yyyy"
 *   defaultSelectionMode="range"
 *   defaultGridMode="MONTH"
 * />
 * ```
 */

const DatePickerContentDrawer = ({
    id,
    defaultDate,
    onSelectDate,
    showFooter,
    separator = '-',
    dataFormat,
    displayFormat,
    defaultSelectionMode = 'single',
    defaultGridMode = 'DAY',
    width = '100%',
    height = '100%'
}: IDatePickerDrawerProps) => {
    const [gridMode, setGridMode] = useState<DatePickerGridModeType>(defaultGridMode)
    const [gridData, setGridData] = useState<IDatePickerRow[]>([])
    const [selection, setSelection] = useState<IDatePickerCell[]>([])
    const [internalDate, setInternalDate] = useState<Date>()

    const { setOpenState, drawerHeight, drawerWidth } = useDrawerContext()

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const jumpToNow = () => {
        const daysData = new Date()
        setInternalDate(daysData)
    }

    const jumpToSelection = () => {
        if (selection.length === 0) return
        const daysData = selection[0].item?.date?.toDate?.()
        setInternalDate(daysData)
    }

    const moveNextGetDate = (forceGridMode?: DatePickerGridModeType): Date =>
        getNextDate(forceGridMode ?? gridMode, internalDate ?? new Date())

    const moveNext = (forceGridMode?: DatePickerGridModeType) => {
        setInternalDate(moveNextGetDate(forceGridMode))
    }

    const movePreviousGetDate = (forceGridMode?: DatePickerGridModeType) =>
        getPreviousDate(forceGridMode ?? gridMode, internalDate ?? new Date())

    const movePrevious = (forceGridMode?: DatePickerGridModeType) => {
        setInternalDate(movePreviousGetDate(forceGridMode))
    }

    const setSelectedCellFromDate = useCallback((date?: Date) => {
        if (!date) return
        const cell = createCell(date.getDate(), date.getMonth(), date?.getFullYear(), {
            selected: true
        })
        setSelection([cell])
    }, [])

    const updateGrid = useCallback(() => {
        if (!internalDate) return

        switch (gridMode) {
            case 'MONTH':
                setGridData(computeMonthsGrid(internalDate))
                break
            case 'YEAR':
                setGridData(computeYearsGrid(internalDate))
                break
            case 'DAY':
            default:
                setGridData(computeDaysGrid(internalDate))
                break
        }
    }, [internalDate, gridMode])

    useEffect(() => {
        let defaultDteTemp = null
        /** If the defaultDate is undefined */
        if (!defaultDate) {
            defaultDteTemp = new Date()
            setInternalDate(defaultDteTemp)
            return
        } else if (defaultDate instanceof Date) {
            /** If the defaultDate is of type Date */
            defaultDteTemp = defaultDate
            setInternalDate(defaultDate)
        } else if (typeof defaultDate === 'string') {
            const dateTemp = new DateObject(new Date(), 'default', separator)
            dateTemp?.setFromString?.(defaultDate, displayFormat ?? 'dd/mm/yyyy')
            if (!dateTemp) {
                console.error(new Error(`Provideed default date is not suitable`))
                return
            }
            defaultDteTemp = dateTemp.toDate?.()
            setInternalDate(defaultDteTemp)
        } else {
            /** if not defaultDate is of type of INdate */
            defaultDteTemp = new Date(defaultDate.year, defaultDate.month, defaultDate.day)
            setInternalDate(defaultDteTemp)
        }
        if (defaultDteTemp) {
            setSelectedCellFromDate(defaultDteTemp)
        }
    }, [defaultDate])

    useEffect(() => {
        updateGrid()
    }, [internalDate, gridMode])

    useEffect(() => {
        if (selection.length === 0) return
        const startDate = selection?.[0]?.item?.date?.toINDate?.()
        const endDate =
            selection.length > 1
                ? selection?.[selection.length - 1]?.item?.date?.toINDate?.()
                : undefined

        onSelectDate(startDate, endDate)
    }, [selection])

    const getSelectedDateNumbers = (): number[] => {
        return selection.reduce<number[]>((acc, item) => {
            acc.push(item.ts)
            return acc
        }, [])
    }

    const { handleKeyDown } = useKeyBindings({
        onEscapeCallback: () => {
            setOpenState?.({} as any, 'closed')
        },
        onArrowLeftCallback: () => {
            const dteTemp = movePreviousGetDate()
            setInternalDate(dteTemp)
            setSelectedCellFromDate(dteTemp)
        },
        onArrowRightCallback: () => {
            const dteTemp = moveNextGetDate()
            setInternalDate(dteTemp)
            setSelectedCellFromDate(dteTemp)
        },
        onKeyCallback(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                setOpenState?.({} as any, 'closed')
            }
            if (['y', 'Y'].includes(e.key)) {
                setGridMode('YEAR')
            }
            if (['m', 'M'].includes(e.key)) {
                setGridMode('MONTH')
            }
            if (['d', 'D'].includes(e.key)) {
                setGridMode('DAY')
            }
            if (['n', 'N'].includes(e.key)) {
                jumpToNow()
            }
            if (['s', 'S'].includes(e.key)) {
                jumpToSelection()
            }
        }
    })

    const datePickerContextDefault: IDatePickerContext = {
        selectionMode: defaultSelectionMode,
        gridMode: gridMode,
        internalDate: internalDate ?? new Date(),
        gridData: gridData,
        selectedCells: selection,
        next: moveNext,
        previous: movePrevious,
        jumpToNow: jumpToNow,
        jumpToSelection: jumpToSelection,
        updateInternalDate: (newDate: Date) => setInternalDate(newDate),
        updateSelectedCells: (cells: IDatePickerCell[]) => setSelection(cells),
        updateGridMode: (gridMode: DatePickerGridModeType) => setGridMode(gridMode),
        clear: () => setSelection([]),
        close: () => {
            setOpenState?.({} as any, 'closed')
        }
    }

    return (
        <DatePickerContext.Provider value={datePickerContextDefault}>
            <DatePickerDrawerUI
                id={id}
                defaultSelectionMode={defaultSelectionMode}
                showFooter={showFooter}
                onClick={handleOnClick}
                width={drawerWidth ?? width}
                height={drawerHeight ?? height}
                handleKeyDown={handleKeyDown}
            />
        </DatePickerContext.Provider>
    )
}

export default DatePickerContentDrawer
