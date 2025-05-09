import { ICheckBoxBaseInputProperties } from '@core/field-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInputProperties } from '@core/field-engine/variants/click-base/click-base-input.types'
import {
    IDrawerBaseInput,
    IDrawerBaseInputProperties
} from '@core/field-engine/variants/drawer-base/drawer-base-input.types'
import { IOptionBaseInputProperties } from '@core/field-engine/variants/option-based/option-base-input.types'
import { IRadioBaseInputProperties } from '@core/field-engine/variants/radio-base/radio-base-input.types'
import { ISelectBaseInputProperties } from '@core/field-engine/variants/select-base/select-base-input.types'
import { ITextBaseInput } from '@core/field-engine/variants/text-base/text-base-input.types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IFieldStyleProperties,
    IStyleManager
} from '@core/managers/style-manager/style-manager.types'
import {
    ITrackingManager,
    TrackingType
} from '@core/managers/tracking-manager/tracker-manager.types'
import {
    IValidationManager,
    IValidationStrategyData
} from '@core/managers/validation-manager/validation-manager.types'
import {
    IValueManager,
    IValueManagerProperties
} from '@core/managers/value-manager/value-manager.types'
import { IInitilizationCheckResult } from './prototype/check-initialized'

/**
 * Should be the root base of a field's properties
 */
export interface IField extends IFieldDescriptor {
    [key: string]: any
    id: number
    name: string
    label: string

    enabled: boolean
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean

    value: FieldDataTypes
    originalValue: FieldDataTypes

    /** message helper method : uses treacker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Core methods */
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes

    setFocus: () => void
    clear: () => void
    enable: (enabled: boolean) => void

    hasChanges: (callback: () => void) => void
    handleValidation: <T extends IEvents>(event?: T, data?: IValidationStrategyData) => void

    handleOnBlur: <T extends IEvents>(data?: T) => void
    handleOnFocus: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void

    /** Dependency accessors */
    domManager: IDomManager<HTMLInputElement>
    drawer: IDrawerBaseInput
    styleManager: IStyleManager
    notificationManager: INotificationManager
    trackingManager: ITrackingManager
    validationManager: IValidationManager
    vlaueManager: IValueManager
}

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

/** @warning: should not being used outside it's main implementation prefer the use of @Ifield */
export type IFieldInput = IFieldBaseInput & Omit<IFieldDescriptor, 'validationOptions' | 'options'>

export interface IFieldBaseInput extends IField, IInitializableDependency {
    new (descriptor: IFieldDescriptor): IFieldBaseInput

    /** initializer builders */
    initializeProperties: (descriptor: IFieldDescriptor) => void
    checkInitialized: () => IInitilizationCheckResult
    useDomManager: (dommableInstance?: IDomManager<HTMLInputElement>) => IFieldBaseInput
    useNotificationManager: (notifierInstance?: INotificationManager) => IFieldBaseInput
    useTrackingManager: (trackerInstance?: ITrackingManager) => IFieldBaseInput
    useValidationManager: (validationStrategyInstance?: IValidationManager) => IFieldBaseInput
    useValueManager: (valueStrategyInstance?: IValueManager) => IFieldBaseInput
    useDrawerManager: (drawerableInstance?: IDrawerBaseInput) => IFieldBaseInput
    useStyleManager: (stylerInstance?: IStyleManager) => IFieldBaseInput
}

export interface IExtendedInputBase extends IInitializableDependency {
    field: IFieldBaseInput
}

export interface IExtendedFieldInput
    extends IFieldStyleProperties,
        IOptionBaseInputProperties,
        IDrawerBaseInputProperties,
        IClickBaseInputProperties,
        ICheckBoxBaseInputProperties,
        IRadioBaseInputProperties,
        ISelectBaseInputProperties,
        IValueManagerProperties,
        ITextBaseInput,
        IExtendedInputBase,
        IInitializableDependency {
    handleOnClear: any
    // getOptionByValue: (value: string) => IOptionItem | null
    // tryGetOptionByIdOrValue: (id: string, value: string) => IOptionItem | null
    // handleOnChanged: <T extends IEvents>(data?: T) => void
    // handleOnClick: <T extends IEvents>(data?: T) => void
    // getOptionById: (id: string) => IOptionItem | null
}
