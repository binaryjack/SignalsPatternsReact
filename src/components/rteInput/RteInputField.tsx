import { useEffect, useRef, useState } from 'react'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import { RteInput } from '../rteInput/RteInput'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { deserializeEngineState } from './core/io/deserializeEngineState'
import { serializeEngineState } from './core/io/serializeEngineState '
import { IStateData, newStateData } from './core/rteInput.types'

interface IRteInputFieldProps {
    fieldName: string
}

const RteInputField = ({ fieldName }: IRteInputFieldProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const editorRef = useRef<HTMLDivElement>(null)
    const [editorId] = useState(`rte-${fieldName}-${Math.random().toString(36).substring(2, 9)}`)

    // Store the latest state to sync with field
    const [lastState, setLastState] = useState<IStateData>({
        data: null,
        ts: ''
    })
    const [initialState, setInitialState] = useState<IStateData>({
        data: null,
        ts: ''
    })

    // When editor state changes, serialize and update field value
    const handleEditorStateChange = (state: IStateData) => {
        // setLastState(state)

        if (field) {
            // Serialize the state to a safe format and store in field
            const serializedData = serializeEngineState(state?.data)

            if (lastState.data === serializedData) return
            field.setValue(serializedData)
            setLastState(newStateData(serializedData))
        }
    }

    // When field value changes from outside, update editor
    useEffect(() => {
        const fieldValue = field?.defaultValue
        if (fieldValue && typeof fieldValue === 'string') {
            try {
                // Deserialize from field value
                const editorState = deserializeEngineState(fieldValue)
                // Update editor (would need implementation in RteInput)
                // This would require adding a "setState" prop to RteInput
                setInitialState(newStateData(editorState))
            } catch (e) {
                console.error('Failed to deserialize RTE content', e)
            }
        }
    }, [field?.defaultValue])

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type="richtext"
            flags={flags}
            onClick={() => {
                // Focus the editor via ref
                editorRef.current?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => {
                field?.clear()
                setTimeout(() => setInitialState(newStateData(null)), 1)
            }}
        >
            <div className="w-full">
                <RteInput
                    id={editorId}
                    onStateChange={handleEditorStateChange}
                    initialState={initialState}
                    externalEditorRef={editorRef}
                />
            </div>
        </FieldSet>
    )
}

export default RteInputField
