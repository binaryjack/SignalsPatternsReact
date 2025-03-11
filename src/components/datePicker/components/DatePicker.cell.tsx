import React, { useEffect, useMemo, useState } from 'react'

import { ifClass, newIFClass } from '../../../dependency/ifClass'
import { DatePickerDisplayType } from '../core/DatePicker.types'
import { IDatePickerCell } from '../core/models/DatePicker.models'
import DatePickerSwitch from './DatePicker.switch'

interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    gridDisplayMode: DatePickerDisplayType
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell = ({
    item,
    onMouseEnter,
    onSelected,
    gridDisplayMode,
    selectedCells
}: IDatePickerCellProps) => {
    const [cellItem, setCellItem] = useState<IDatePickerCell>(item)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        onMouseEnter(item)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!cellItem?.item) return

        if (cellItem.item.isCurrentScope) {
            const newCellItem = { ...cellItem }
            if (!newCellItem?.item) return
            newCellItem.item.selected = !newCellItem.item.selected
            setCellItem(newCellItem)
        }
        onSelected(item)
    }

    useEffect(() => {
        if (!cellItem) return
        const newCellItem = { ...cellItem }
        if (!newCellItem?.item) return
        newCellItem.item.selected = !!selectedCells.find((o) => o.code === cellItem.code)
        setCellItem(newCellItem)
    }, [selectedCells])

    const scope = useMemo(() => {
        return item.item?.isNextScope ? 'next' : item.item?.isPreviousScope ? 'previous' : 'current'
    }, [item])

    const day = useMemo(() => {
        return cellItem.id
    }, [item])

    const month = useMemo(() => {
        return (cellItem?.item?.date?.dateObject.month ?? 0) + 1
    }, [item])

    const year = useMemo(() => {
        return cellItem?.item?.date?.dateObject.year
    }, [item])

    const classes = ifClass([
        newIFClass('is-now', cellItem.item?.isNow),
        newIFClass('is-weekend', cellItem.item?.isWeekEnd),
        newIFClass('selected', cellItem.item?.selected)
    ])

    return (
        <div
            className={`date-cell ${classes} ${scope} `}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            data-code={cellItem?.code}
        >
            <div>
                <DatePickerSwitch
                    definedGridMode={gridDisplayMode}
                    day={<span> {day}</span>}
                    year={<span> {year}</span>}
                    month={<span> {month}</span>}
                />
            </div>
        </div>
    )
}

export default DatePickerCell
