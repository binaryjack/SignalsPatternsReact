/** @jsxImportSource @emotion/react */

import { useRef } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { ElementPositionOutputType } from '../../core/hooks/screen/screen.types'
import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import { Button } from '../button/Button'
import { Portal } from '../portals/Portal'
import { DrawerContext, IDrawerContext } from './Drawer.context'
import { DrawerOpenStateType } from './Drawer.types'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    position: ElementPositionOutputType
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    width?: string
    height?: string
}

const drawerConditionnalStyle = (id: string, position: ElementPositionOutputType) => {
    return `   
        #${id}-drawer-slot-${position}-container 
        .drawer-container.open {   
            transform: ${position !== 'center' ? `scaleY(1)` : 'scale(1)'};
            ${position !== 'center' ? `${position}:0;` : ''}             
        }
        #${id}-drawer-slot-${position}-container 
        .drawer-container.closed { 
            transform: ${position !== 'center' ? `scaleY(0)` : 'scale(0)'};
            ${position !== 'center' ? `${position}:0;` : ''}    
        }
    `
}
export const Drawer = ({
    id,
    children,
    position,
    drawerOpenState,
    onSetOpenState,
    width = '200px',
    height = '100px'
}: IDrawerProps) => {
    const drawerContainerRef = useRef(null)

    const handleClose = () => {
        onSetOpenState?.({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    const drawerContextDefault: IDrawerContext = {
        onSetOpenState,
        drawerOpenState,
        drawerWidth: width,
        drawerHeight: height
    }

    useOnClickOutside(drawerContainerRef, handleClose, 'mouseup')

    return (
        <DrawerContext.Provider key={id} value={drawerContextDefault}>
            <Portal
                id={id}
                slotName={`drawer-slot-${position}`}
                children={
                    <>
                        <div
                            ref={drawerContainerRef}
                            id={`${id}-drawer-wrapper`}
                            className={`flex absolute drawer-container ${drawerOpenState === 'open' ? 'open' : 'closed'} overflow-hidden`}
                            style={{
                                width: width,
                                height: height,
                                transformOrigin: position,
                                alignItems: position === 'center' ? 'center' : 'flex-start',
                                justifyItems: position === 'center' ? 'center' : 'unset',
                                alignContent: position === 'center' ? 'center' : 'unset',
                                justifyContent: position === 'center' ? 'center' : 'unset'
                            }}
                        >
                            {children}
                        </div>
                        {/** I need to render the style this way because we are in a portal context which the component is rendered on demand
                         * because of this, if we use inline style or emotions or styled component we can not achieve this.
                         * we have a state open / close which must be isolated with specific css query that's why we need to append the style here after
                         */}
                        <style>{drawerConditionnalStyle(id, position)}</style>
                    </>
                }
            />
            <Portal
                id={id}
                slotName={'toggle-drawer'}
                children={
                    <Button
                        id={`${id}-toggle-drawer-btn`}
                        title={'Toggle Drawer'}
                        variant={{ rounded: true, size: 'md' }}
                        onClickCallback={(e) =>
                            onSetOpenState?.(e, drawerOpenState === 'open' ? 'closed' : 'open')
                        }
                        aria-expanded={drawerOpenState === 'open'}
                        aria-controls={`${id}-drawer-wrapper`}
                    >
                        {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DrawerContext.Provider>
    )
}
