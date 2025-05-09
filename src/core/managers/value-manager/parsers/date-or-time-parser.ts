import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { DateObjectTypes } from '@components/date-picker/core/models/date-object.types'

import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { isNDateNullOrUndefined } from '@core/framework/utility/is-ndate-null-or-undefined'
import { TParser } from '../value-manager.types'

export const dateOrTimeParser: TParser<string | null> = (
    value: Partial<FieldDataTypes>
): string | null => {
    if (!isNDateNullOrUndefined(value as DateObjectTypes)) {
        const newDte = new DateObject(undefined, 'temp-date')
        if (!newDte?.toString || !newDte.isDefined || !newDte.parse) return null
        newDte.parse?.(value as DateObjectTypes)
        return newDte.isDefined?.() ? newDte.toString(DatePickerFormatsEnum.YYYY_MM_DD) : null
    }
    return null
}
