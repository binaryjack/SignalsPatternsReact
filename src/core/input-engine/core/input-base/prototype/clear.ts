import { newEvent } from '@core/framework/events/new-event'
import { IInput } from '../input-base.types'

/**
 * Clears the state and value of the field input, resetting it to its initial state.
 *
 * This method performs the following actions:
 * - Clears the `errors` and `guides` arrays.
 * - Resets the `checked` property of all associated internal HTML input element references.
 * - Notifies listeners about the `validate` and `changed` events with the appropriate field state.
 * - Updates the field's state style to reflect the "clear" action.
 * - Sets the field's value to `null`.
 * - Focuses the field input.
 * - Resets the `value` and `checked` properties of the main internal HTML input element reference, if it exists.
 *
 * @this IInput - The field input instance on which the method is called.
 */
export const clear = function (this: IInput) {
    /**need to be implemented in variants imputs */
    // this.errors = []
    // this.guides = []

    this.styleManager?.update('clear', true)
    this.value = null
    this.domManager.dmClear()
    this.focus()

    this?.notificationManager?.notify(
        'onClear',
        newEvent(this.name, clear.name, 'onClear', `field.${clear.name}`, this.name, this)
    )
}
