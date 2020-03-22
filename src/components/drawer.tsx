import React, { Fragment, useRef, useState, useEffect, useLayoutEffect } from 'react';


const Drawer = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ yCoordinates, setYCoordinates ] = useState({
        current: 120,
        min: 0,
        max: 0,
        minVisible: 0,
        windowMax: 0
    });


    const [ drawerContentHeight, setDrawerContentHeight ] = useState(0);
    
    const drawerEl = useRef<HTMLDivElement>(null);
    const drawerContentEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log('info:');
        // console.log(yCoordinates);
    })

    useLayoutEffect(() => {
        if (null !== drawerEl.current && null !== drawerContentEl.current) {
            setDrawerContentHeight(drawerEl.current.offsetHeight);
            setYCoordinates({
                ...yCoordinates,
                windowMax: drawerEl.current.offsetHeight,
                max: drawerEl.current.offsetHeight - drawerContentEl.current.offsetHeight,
                minVisible: drawerEl.current.offsetHeight * 0.6
            });
        }
    }, [])

    const handleTouchMove = (e:any) => {
        console.log(e.touches[0].clientY);
    }


    const handleScroll = (e:any) => {

        if (e.deltaY > 0) {
            // User is scrolling down
            if ((yCoordinates.current + e.deltaY) > yCoordinates.max) {
                console.log("Lower limit reac3hed");
                setYCoordinates({...yCoordinates, current: yCoordinates.max})
            } else {
                setYCoordinates({...yCoordinates, current: yCoordinates.current + e.deltaY})
            }
        } else {
            // User is scrolling up


            
            if ((yCoordinates.current - e.deltaY) > yCoordinates.minVisible) {
                console.log("Upper limit reached");
                setYCoordinates({...yCoordinates, current: yCoordinates.minVisible});

                // If they keep scrolling even further, dismiss the drawer
                if (Math.abs(e.deltaY) > yCoordinates.minVisible) {
                    console.log('Dismissing drawer');
                    setIsOpen(!isOpen);
                }

            } else {
                setYCoordinates({...yCoordinates, current: yCoordinates.current - e.deltaY});
            }
        }
    }

    const handleTriggerDrawer = (e:Object) => {
        setIsOpen(!isOpen);
        isOpen ? document.body.style.overflow = "" : document.body.style.overflow = "hidden"
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
                    style={ { transform: isOpen ? `translateY(${yCoordinates.current}px)` : `translateY(${yCoordinates.windowMax}px)` } }  
                    onMouseDown={handleMouseDown}
                    onTouchMoveCapture={handleTouchMove}
                    >
                    <span className="drawer-handle-icon"></span>
                    <ul>
                        {Array.from(Array(40), (e, i) => {
                            return <li key={i}>List item {i + 1}</li>
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;