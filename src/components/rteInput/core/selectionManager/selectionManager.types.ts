import { ILinkData, ISelection } from '../rteInput.types'
import { IRtiEngine } from '../rtiEngine/rtiEngine.types'

export interface ISelectionManager {
    new (editorElement: HTMLElement, engine: IRtiEngine): ISelectionManager
    editorElement: HTMLElement
    currentSelection: ISelection | null
    engine: IRtiEngine
    isProcessingSelection: boolean

    captureSelection: () => ISelection | null
    restoreSelection: (selection: ISelection) => void
    getCurrentSelection: () => ISelection | null
    resetSelection: () => void
    getAllNodesInRange: (range: Range) => Node[]
    getLinkAtSelection: () => ILinkData | null
}
