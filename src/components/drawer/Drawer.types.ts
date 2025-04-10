import { ToggleableStateType } from '../toggleable/Toggleable.types'

export type DrawerDisplayStyleType = 'top' | 'bottom' | 'center'

export interface IDrawerBase {
    openState: ToggleableStateType
    setOpenState: (state: ToggleableStateType) => void
}

export interface IDrawerSize {
    width: number
    height: number
}
