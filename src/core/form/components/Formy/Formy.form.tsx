import React, { useMemo } from 'react'

import { IFieldInput } from '../../../field/fieldInputBase/fieldInput.types'
import { IFormy, IFormyFlags } from '../../formyBase/formyBase.types'
import { formyContext, IFormyContext, useForm } from './Formy.context'
import FormyDebug from './Formy.debug'

interface IFormyFormProps {
    formy: IFormy
    children: React.ReactNode
}

const FormyForm = ({ formy, children }: IFormyFormProps) => {
    // const [formInstance, setFormInstance] = useState<IFormy | undefined>()

    const formInstance = useMemo(() => {
        return formy
    }, [formy])

    useForm(formInstance)

    // useEffect(() => {
    //     if (formInstance) return
    //     const formy = newFormy(formId, schema, translationBuilder, validationLocalize)
    //     if (!formy) return
    //     setFormInstance(formy)
    // }, [schema, translationBuilder, validationLocalize])

    const output: IFormyContext = {
        getFields: () => {
            return formInstance?.fields ?? []
        },
        getField: (fieldName: string): IFieldInput | undefined => {
            return formInstance?.fields?.find((field) => field.name === fieldName)
        },
        formInstance: formInstance,
        getFormFlags: () => {
            return {
                isValid: formInstance?.isValid,
                isDirty: formInstance?.isDirty,
                isBusy: formInstance?.isBusy
            } as IFormyFlags
        }
    }

    return (
        <formyContext.Provider value={output}>
            <form data-form-id={''}>{children}</form>
            <FormyDebug formy={formInstance} />
        </formyContext.Provider>
    )
}

export default FormyForm
