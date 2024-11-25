import { Signals } from '../../../core/signals/signal'
import { ISignal } from '../../../core/signals/signal.type'
import TextChild from './TextChild'
import TextChildWithSignal from './TextChildWithSignal'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

export const textSignal = Signal<string>('text1', '')

const TextInput = () => {
    useSignal('TextInput', textSignal)
    const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        textSignal.update((s: ISignal<string>) => (s.value = e.currentTarget.value))
    }

    return (
        <div>
            <h1>Text demo</h1>
            <input id={`text-input`} title="text" onChange={handleTextChanged} />
            {textSignal.get()}
            <TextChild id={'12'}>
                <TextChild id={'13'}>
                    <TextChild id={'14'}>
                        <TextChildWithSignal />
                    </TextChild>
                </TextChild>
            </TextChild>
        </div>
    )
}
export default TextInput
