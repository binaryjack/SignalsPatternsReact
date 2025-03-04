import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DateObject } from '../../../dependency/schema/descriptor/field.data.dateobject.type'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import {
    isBooleanNullOrUndefined,
    isNDateNullOrUndefined,
    isNotNumericNullOrUndefined,
    isNullEmptyOrUndefined
} from '../fieldInputBase/utils'
import { TParserStrategy } from './valueStrategy.types'

export const DateOrTimeParserStrategy: TParserStrategy<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    if (!isNDateNullOrUndefined(value as INDate | DateObject | null)) {
        const newDte = new DateObject('temp-date')
        newDte.parseObject = value as INDate
        return newDte.isDefined ? newDte.toString('yyyy/mm/dd') : null
    }
    return null
}

export const NumericValueParserStrategy: TParserStrategy<number | null> = (
    value: Partial<FieldValuesTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null

export const StringParserStrategy: TParserStrategy<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    return !isNullEmptyOrUndefined(value as string | null | undefined) && typeof value !== 'object'
        ? (value as string)
        : null
}

export const BooleanParserStrategy: TParserStrategy<boolean | null> = (
    value: Partial<FieldValuesTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
