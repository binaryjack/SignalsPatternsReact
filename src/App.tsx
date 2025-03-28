import { useEffect } from 'react'

import { Button } from './components/button/Button'
import FormDemo from './demo/forms/FormDemo'
import Positionning from './demo/positionning/Positionning'
import Counter from './demo/signals/counter/Counter'
import TextInput from './demo/signals/text/TextInput'

interface IApp extends Node {
    testName?: string
}

interface IControlsDemo {
    id: string
    selectShowrooms: string
    inputControl: string
    selectOptionsId: string
    trueFalseValue: boolean
    dateTimeValue: string
    selectedRadioId: number
    richTextField: string
    rangeSlider: number
    userName: string
    password: string
    toggle: boolean
}

const newFormObject: IControlsDemo = {
    id: '1',
    selectShowrooms: '0',
    inputControl: 'test',
    selectOptionsId: '0',
    trueFalseValue: true,
    dateTimeValue: '2012-07-12',
    selectedRadioId: 1,
    richTextField: '',
    rangeSlider: 69,
    userName: '',
    password: '',
    toggle: false
}

const App = () => {
    useEffect(() => {}, [])

    // const [fields, setFields] = useState<IFieldDescriptor[]>([])
    // useEffect(() => {
    // build a schema for the fields to be used
    // const item = controlDemoSchema
    // // map schema to fieldsDescriptors collection from schema
    // const fieldDescriptors = mapSchemaToFieldDescriptor(item)

    // setFields(fieldDescriptors)
    //     // map object values to fieldsDescriptors collection
    //     // const fields = mapObjectToFields(fieldDescriptors, newFormObject)

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const formDemo = () => (
        <div>
            <h1>Forms Inputs using event driven design classes</h1>
            <h3>Patterns used: builder, strategy, observer, factory</h3>
            <FormDemo />
        </div>
    )
    const TextInputDemo = () => (
        <div>
            <br />
            <h1>Signals Text Input</h1>
            <h3>Patterns used: signals, observer </h3>
            <TextInput />
        </div>
    )
    const CounterDemo = () => (
        <div>
            <br />
            <h1>Signals Counter</h1>
            <h3>Patterns used: signals, observer </h3>
            <Counter />
        </div>
    )

    return (
        <div className={'app'}>
            <Button
                onClickCallback={(e) => console.log('CLICKED')}
                id={'lambda-button-demo'}
                title={'drawer-button'}
                variant={{ rounded: true, size: 'md', width: '150px' }}
            >
                Demo Drawer
            </Button>

            <Positionning />

            {formDemo()}
        </div>
    )
}

export default App
