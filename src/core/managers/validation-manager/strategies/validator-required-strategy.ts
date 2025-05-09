import { newFieldError, newFieldGuide } from '@core/framework/errors'
import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'
import {
    IValidationMethodStrategy,
    IValidationStrategyData,
    newValidationResult,
    ValidationErrorsCodes
} from '../validation-manager.types'

export const ValidatorRequiredStrategy = function (this: IValidationMethodStrategy) {
    this.validate = function (data: IValidationStrategyData) {
        if (!data?.validationOptions?.requiredData?.required) {
            return newValidationResult(true, data.fieldName, ValidationErrorsCodes.required)
        }

        const hasExpectedValue = !!data.expectedValue
        const hasValue = !isNullEmptyOrUndefined(data?.value as string | null | undefined)

        if (!hasValue || (hasValue && hasExpectedValue && data.expectedValue !== data?.value)) {
            return newValidationResult(
                false,
                data.fieldName,
                ValidationErrorsCodes.required,
                newFieldError(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.requiredData?.error ?? undefined
                ),
                newFieldGuide(
                    data.fieldName,
                    ValidationErrorsCodes.required,
                    data.validationOptions.requiredData?.guide ?? undefined
                ),
                data
            )
        }

        return newValidationResult(true, data.fieldName, ValidationErrorsCodes.required)
    }
} as any as IValidationMethodStrategy
