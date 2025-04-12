import { ISelection } from '../rteInput.types'

export interface ISelectionManager {
    new (editorElement: HTMLElement): ISelectionManager
    editorElement: HTMLElement
    currentSelection: ISelection | null

    captureSelection: () => ISelection | null

    restoreSelection: (selection: ISelection) => void

    getCurrentSelection: () => ISelection | null

    resetSelection: () => void
}
