// validate-all.ts

import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IFormy } from '../formy-base.types'

/**
 * Validates all fields in the Formy instance.
 */
export function validateAll(this: IFormy) {
    const results: IValidationResult[] = []
    for (const fld of this.fields) {
        if (!fld.shouldValidate) {
            continue
        }
        // results.push(...fld.))
    }
    this.isValid = results?.every((o) => o.state) ?? false
    // this.observers.trigger()
}
