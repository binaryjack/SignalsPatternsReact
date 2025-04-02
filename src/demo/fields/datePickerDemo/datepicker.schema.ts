import { DateTimeBuilder } from '../../../dependency/schema/fieldSchema/field.schema.specific.builders'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { Validators } from '../../../dependency/schema/validationSchema/validation.schema.specific.validators'

export const dateTimeSchema: IEntityScheme = {
    name: 'date-picker-demo-schema',
    properties: [
        DateTimeBuilder.validationData(true, Validators.dateRequiredIso8601Validator).build()
    ]
}
