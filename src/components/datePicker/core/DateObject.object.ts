import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerOutputFormatType } from './DatePicker.types'
import { getPaddedNumber } from './DatePicker.utils'
import { IDateObject } from './models/DateObject.models'
import { DateObjectTypes } from './models/DateObject.types'

export const DateObject = function (
    this: IDateObject,
    date?: Date,
    name: string = '',
    separator: string = '-'
) {
    this.name = name
    this.separator = separator ?? '-'
    this.dateObject = date
        ? { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
        : {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear()
          }
    this.dayOfWeek = date ? date.getDay() : new Date().getDay()
} as any as IDateObject

DateObject.prototype = {
    day: function () {
        return this.dateObject.day
    },
    month: function () {
        return this.dateObject.month
    },
    year: function () {
        return this.dateObject.year
    },
    isDefined: function () {
        return (
            this.dateObject.day !== 0 && this.dateObject.month !== 0 && this.dateObject.year !== 0
        )
    },
    setFromStrings: function (day = '', month = '', year = '') {
        this.dateObject.day = parseInt(day)
        this.dateObject.month = parseInt(month)
        this.dateObject.year = parseInt(year)
        this.dayOfWeek = new Date(
            this.dateObject.year,
            this.dateObject.month,
            this.dateObject.day
        ).getDay()
    },
    setFromNumbers: function (day = 0, month = 0, year = 0) {
        this.dateObject.day = day
        this.dateObject.month = month
        this.dateObject.year = year
        this.dayOfWeek = new Date(year, month, day).getDay()
    },
    setFromDate: function (date: Date) {
        this.dateObject.day = date.getDate()
        this.dateObject.month = date.getMonth()
        this.dateObject.year = date.getFullYear()
        this.dayOfWeek = date.getDay()
    },
    setFromNumber: function (date: number) {
        const d = new Date(date)
        this.setFromDate(d)
    },
    /** here we store the date object with the month shifted - 1 */
    setFromObject: function (date: INDate) {
        this.dateObject = { ...date, month: date.month - 1 }
    },
    setFromString: function (date: string, format: DatePickerOutputFormatType) {
        if (date.length === 10) {
            let _year = ''
            let _month = ''
            let _day = ''
            if (format === 'mm/dd/yyyy') {
                _month = date.substring(0, 2)
                _day = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === 'dd/mm/yyyy') {
                _day = date.substring(0, 2)
                _month = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === 'yyyy/mm/dd') {
                _year = date.substring(0, 4)
                _month = date.substring(5, 7)
                _day = date.substring(8)
            }

            this.setFromStrings(_day, _month, _year)
            return true
        }
        return false
    },
    isNullEmptyOrUndefined: function (dateObject: INDate | undefined | null) {
        return dateObject === null || dateObject === undefined
    },
    setCurrentDate: function (year: number, month: number, day = 1) {
        this.setFromNumbers(day, month, year)
    },
    /** Note that  */
    toString: function (format: DatePickerOutputFormatType) {
        if (format === 'mm/dd/yyyy') {
            return `${getPaddedNumber(this.dateObject.month, 2)}${this.separator}${getPaddedNumber(this.dateObject.day, 2)}${this.separator}${this.dateObject.year}`
        }

        if (format === 'dd/mm/yyyy') {
            return `${getPaddedNumber(this.dateObject.day, 2)}${this.separator}${getPaddedNumber(this.dateObject.month, 2)}${this.separator}${this.dateObject.year}`
        }

        if (format === 'yyyy/mm/dd') {
            return `${this.dateObject.year}${this.separator}${getPaddedNumber(this.dateObject.month, 2)}${this.separator}${getPaddedNumber(this.dateObject.day, 2)}`
        }
        return ''
    },
    toDate: function () {
        return new Date(this.dateObject.year, this.dateObject.month, this.dateObject.day)
    },
    /** here we return the date object with the month shifted + 1 */
    toINDate: function () {
        return {
            year: this.dateObject.year,
            month: this.dateObject.month + 1,
            day: this.dateObject.day
        } as INDate
    },
    parse: function (value: DateObjectTypes) {
        if (typeof value === 'string') {
            const isValidFormat =
                this.setFromString(value, 'yyyy/mm/dd') ||
                this.setFromString(value, 'mm/dd/yyyy') ||
                this.setFromString(value, 'dd/mm/yyyy')
            if (isValidFormat) return
        }

        if (typeof value === 'number') {
            this.setFromNumber(value)
            return
        }

        if (value instanceof Date) {
            this.setFromDate(value)
            return
        }

        if (typeof value === 'object' && value !== null) {
            if ('year' in value && 'month' in value && 'day' in value) {
                this.setFromObject(value as INDate)
                return
            }
        }
        throw Error(`Cannot parse DATE ${JSON.stringify(value)} `)
    }
}
