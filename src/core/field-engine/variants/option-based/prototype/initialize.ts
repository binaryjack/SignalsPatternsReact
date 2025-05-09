import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'

import { abstractInitializer } from '@core/field-engine/core/input-base/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IOptionBaseInput } from '../option-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: IOptionBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                newAssert(this.field !== undefined, `The dependency field is not instanciated`),
                newAssert(
                    this.field.isInitialized,
                    `${this.dependencyName}: The dependency field is not properly initialized`
                ),
                newAssert(
                    params.descriptor?.options?.length > 0,
                    `${this.dependencyName}: None options were provided. this feature will not work properly`
                )
            ]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(this.field, (context) => {
            context.options = params.descriptor?.options ?? []
            context.optionsInitialized = true
            context.selectedOptionId = null
        })

        if (success) {
            logManager(this.field.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.trackingManager, 'critical', this.dependencyName, e)
    }
}
