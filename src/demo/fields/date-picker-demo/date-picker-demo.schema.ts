import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { Validators } from '@core/framework/schema/validation-schema/validators'
import { DatePickerBuilder } from './date-picker-demo.schema.specific.builders'

export const dateTimeSchema: IEntityScheme = {
    name: 'date-picker-demo-schema',
    properties: [
        DatePickerBuilder.setValidationData(true, Validators.dateRequiredIso8601Validator).build()
    ]
}
