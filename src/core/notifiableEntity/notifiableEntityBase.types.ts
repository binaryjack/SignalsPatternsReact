/**
 * Interface representing a notifiable entity.
 *
 * @interface INotifiableEntity
 *
 * @property {Map<string, INotifier>} notifiers - A map of notifiers associated with the entity.
 * @property {IDataMutationObserverSubject} observers - The observers monitoring data mutations.
 * @property {ComputedSignalCallback<unknown> | null} computedSignalCallback - A callback for computed signals, or null if not set.
 *
 * @method notify
 * @template T
 * @param {TNotifierEventsType} type - The type of notification.
 * @param {T} [data] - Optional data to be passed with the notification.
 *
 * @method accept
 * @param {INotifier} notify - The notifier to be accepted by the entity.
 *
 * @method init
 * Initializes the notifiable entity.
 *
 * @method dispose
 * Disposes of the notifiable entity, performing any necessary cleanup.
 */

import { IDataMutationObserverSubject } from '../dataMutationObserver/dataMutationObserverSubject.types'
import { INotifier, TNotifierEventsType } from '../notifications/notifications.types'
import { ComputedSignalCallback } from '../signals/signal.type'

export interface INotifiableEntity {
    new (): INotifiableEntity
    notify: <T>(type: TNotifierEventsType, data?: T) => void
    accept: (notify: INotifier) => void
    init: () => void
    dispose: () => void
    notifiers: Map<string, INotifier>
    observers: IDataMutationObserverSubject
    computedSignalCallback: ComputedSignalCallback<unknown> | null
}
