import { INotifier } from '@core/managers/notification-manager/notification-manager.types'
import { IFieldBaseInput } from '../field-input-base-types'

export type abstractInitializerSignatureType = <TFieldInput extends IFieldBaseInput>(
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotifier[]
) => Promise<boolean>

export const abstractInitializer: abstractInitializerSignatureType = <
    TFieldInput extends IFieldBaseInput
>(
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotifier[]
) =>
    new Promise<boolean>((resolve, reject) => {
        try {
            setup?.(fieldInput)

            if (notifiers) {
                for (const n of notifiers) {
                    fieldInput.notificationManager?.accept(n)
                }
            }
            resolve(true)
        } catch (e: any) {
            reject(new Error(e.message))
        }
    })
