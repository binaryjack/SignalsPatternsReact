import React, { useEffect } from 'react'

import { IValidationLocalize } from '../../../dependency/localize/localize.type'
import { TranslatioBuilderType } from '../../../dependency/localize/localize.utils'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { mapSchemaToFieldDescriptor } from '../../../dependency/toFieldDescriptor'
import { FieldInputCreator, useFieldHookType } from '../../field/fieldInputBase/FieldInput.creator'
import { notify, TNotifierType } from '../../notifications/notifications.types'
import { Formy } from './FormyBase'
import { IFormy, IFormyFlags } from './formyBase.types'

export const FormCreator = (function () {
    const forms: Map<string, IFormy> = new Map<string, IFormy>()

    const useForm = function (form: IFormy) {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0)

        const stableForm = React.useMemo(() => {
            return form
        }, [form])

        const acceptNotificationStrategy = (localName: string, trigger: TNotifierType) => {
            if (!stableForm) return
            stableForm.accept(
                notify(
                    `${stableForm.id}_${localName}_${handleRefresh.name}`,
                    handleRefresh.bind(useForm),
                    trigger
                )
            )
            stableForm.fields.forEach((field) => {
                field.accept(
                    notify(
                        `${field.id}_${localName}_${handleRefresh.name}`,
                        handleRefresh.bind(useForm),
                        trigger
                    )
                )
            })
        }

        const handleRefresh = () => {
            forceUpdate()
        }

        useEffect(() => {
            if (!stableForm) return
            acceptNotificationStrategy('validate_hook_form', 'validate')
        }, [stableForm])
    }

    const getFieldHook = function (): useFieldHookType {
        const { useField } = FieldInputCreator
        return useField
    }

    const getForm = function (formName: string): IFormy | undefined {
        return forms.get(formName)
    }

    const getFormFlags = function (id: string): Partial<IFormyFlags> {
        const currentForm = forms.get(id)
        if (!currentForm) return {}
        return {
            isBusy: currentForm?.isBusy,
            isDirty: currentForm?.isDirty,
            isValid: currentForm?.isValid
        }
    }

    const newFormy = function (
        id: string,
        schema: IEntityScheme,
        translationBuilder: TranslatioBuilderType,
        validationLocalize: () => IValidationLocalize
    ) {
        const fieldDescriptors = mapSchemaToFieldDescriptor(
            schema,
            translationBuilder,
            validationLocalize()
        )
        const { newFieldFromDescriptors } = FieldInputCreator
        const formyTemp = new Formy(id)
        formyTemp.addFields(...newFieldFromDescriptors(fieldDescriptors))
        forms.set(id, formyTemp)
        return formyTemp
    }

    return {
        newFormy,
        getFormFlags,
        getForm,
        getFieldHook,
        useForm
    }
})()