import { IFieldInput } from '../fieldInput.types'

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
 * @this IFieldInput - The field input instance on which the method is called.
 */
export const clear = function (this: IFieldInput) {
    this.errors = []
    this.guides = []

    this.internalHTMLElementRefs?.forEach((element: React.RefObject<HTMLInputElement>) => {
        if (element.current) {
            element.current.checked = false
        }
    })

    this.notify('validate', {
        fieldName: this.name,
        fieldState: 'reset'
    })
    this.notify('changed', {
        fieldName: this.name,
        fieldState: 'onChange'
    })

    this.fieldStateStyle.update('clear', true)
    this.value = null

    this.focus()

    if (!this.internalHTMLElementRef?.current) {
        return
    }
    this.internalHTMLElementRef.current.value = ''
    this.internalHTMLElementRef.current.checked = false
}
