import React, { Fragment, useRef, useState, useEffect, useLayoutEffect } from 'react';


const Drawer = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ yCoordinates, setYCoordinates ] = useState({
        current: 120,
        min: 0,
        max: 0
    });


    const [ drawerContentHeight, setDrawerContentHeight ] = useState(0);
    
    const drawerEl = useRef<HTMLDivElement>(null);
    const drawerContentEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log('info:');
        // console.log(yCoordinates.max);
    })

    useLayoutEffect(() => {
        if (null !== drawerEl.current && null !== drawerContentEl.current) {
            setDrawerContentHeight(drawerEl.current.offsetHeight);
            setYCoordinates({...yCoordinates, max: drawerEl.current.offsetHeight - drawerContentEl.current.offsetHeight});
        }
    }, [])



    const handleScroll = (e:any) => {
        console.log(yCoordinates);
        console.log(e.deltaY);

        if (e.deltaY > 0) {
            console.log('scrolling down');
            // console.log(yCoordinates.current + e.deltaY);
            if ((yCoordinates.current + e.deltaY) > yCoordinates.max) {
                console.log("max!!");
                setYCoordinates({...yCoordinates, current: yCoordinates.max})
            } else {
                setYCoordinates({...yCoordinates, current: yCoordinates.current + e.deltaY})
            }
        } else {
            console.log('scrolling up');
            setYCoordinates({...yCoordinates, current: yCoordinates.current - e.deltaY})
            // console.log(yCoordinates.current + e.deltaY);
        }
        // let newY = yCoordinates.current:number
    }

    const handleTriggerDrawer = (e:Object) => {
        setIsOpen(!isOpen);
        isOpen ? document.body.style.overflow = "" : document.body.style.overflow = "hidden"

        // if (null !== drawerEl.current) {
        //     console.log(drawerEl.current.offsetHeight);
        // }
    }

    const handleMouseDown = (e:Object) => {
        console.log("clicked the drawer!");
    }
    
    return (
        <Fragment>
            <button className="dev-button" onClick={handleTriggerDrawer}>Toggle Drawer</button>
            {/* Main Wrapper */}
            <div
                ref={drawerEl}
                onWheel={handleScroll}
                className={ isOpen ? 'drawer-container open' : 'drawer-container'}
            >
                {/* Main Drawer Content */}
                <div className="drawer-background" onClick={handleTriggerDrawer}></div>
                <div
                    className="drawer"
                    ref={drawerContentEl}
                    style={ { transform: isOpen ? `translateY(${yCoordinates.current}px)` : 'translateY(100%)' } }  
                    onMouseDown={handleMouseDown}
                    >
                    <span className="drawer-handle-icon"></span>
                    <ul>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                        <li>This is drawer content!</li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;