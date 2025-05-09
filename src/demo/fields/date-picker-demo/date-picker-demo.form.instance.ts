import { newFormy } from '@components/formy/formy.context'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import { dateTimeSchema } from './date-picker-demo.schema'

export const datePickerDemoFormInstance = newFormy(
    'date-picker-form-schema',
    dateTimeSchema,
    getTranslationBuilder,
    getTranslations,
    ['onChange']
)
