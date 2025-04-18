import { IRtiEngine } from '../rtiEngine.types'

export const setState = function (this: IRtiEngine, state: string | null) {
    this.editorElement.innerHTML = state ?? ''
}
