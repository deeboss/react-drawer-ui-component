import React, { Fragment, useRef, useState, useEffect, useLayoutEffect } from 'react';


const Drawer = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ yCoordinates, setYCoordinates ] = useState({
        starting: 120,
        current: 120,
        min: 0,
        max: 0,
        minVisible: 0,
        windowMax: 0
    });


    const [ touchYOffset, setTouchYOffset ] = useState({
        start: 0,
        delta: 0,
        smoothing: 0.5
    });


    const [ drawerContentHeight, setDrawerContentHeight ] = useState(0);
    
    const drawerEl = useRef<HTMLDivElement>(null);
    const drawerContentEl = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // console.log('info:');
        if (isOpen) {
            if (touchYOffset.delta > 0) {
                // User is touch scrolling up
                console.log("up");
                // console.log(yCoordinates.current + touchYOffset.delta);
                // console.log((yCoordinates.current + touchYOffset.delta) * touchYOffset.smoothing);


                if (yCoordinates.current + (touchYOffset.delta * touchYOffset.smoothing) > yCoordinates.max) {
                    console.log("Lower limit reached");
                    setYCoordinates({...yCoordinates, current: yCoordinates.max})
                } else {
                    setYCoordinates({...yCoordinates, current: yCoordinates.current + (touchYOffset.delta * touchYOffset.smoothing)});
                }

            } else {
                // User is touch scrolling down
                console.log("down");
                // console.log(yCoordinates.current - touchYOffset.delta);
                // console.log((yCoordinates.current - touchYOffset.delta) * touchYOffset.smoothing);


                if (yCoordinates.current - (touchYOffset.delta * touchYOffset.smoothing) > yCoordinates.minVisible) {
                    console.log("Upper limit reached");
                    // hasReachedTop = true;
                    setYCoordinates({...yCoordinates, current: yCoordinates.minVisible});
                } else {
                    setYCoordinates({...yCoordinates, current: yCoordinates.current - (touchYOffset.delta * touchYOffset.smoothing)});
                }
            }
        }

    }, [touchYOffset.delta]);

    useLayoutEffect(() => {
        if (null !== drawerEl.current && null !== drawerContentEl.current) {
            setDrawerContentHeight(drawerEl.current.offsetHeight);
            setYCoordinates({
                ...yCoordinates,
                current: yCoordinates.starting,
                windowMax: drawerEl.current.offsetHeight,
                max: drawerEl.current.offsetHeight - drawerContentEl.current.offsetHeight,
                minVisible: drawerEl.current.offsetHeight * 0.6
            });
        }
    }, [isOpen]);


    const handleTouchStart = (e:any) => {
        setTouchYOffset({...touchYOffset, start: e.touches[0].pageY});
    }

    const handleTouchMove = (e:any) => {

        setTouchYOffset({...touchYOffset, delta: touchYOffset.start - e.touches[0].pageY});    }


    const handleScroll = (e:any) => {
        // let hasReachedTop : boolean = false;
        // console.log("can this drawer be dismissed by scrolling up?");
        // console.log(hasReachedTop);
        // console.log('---------------------------------------------')

        if (e.deltaY > 0) {
            // User is scrolling down
            // hasReachedTop = false;
            
            if ((yCoordinates.current + e.deltaY) > yCoordinates.max) {
                console.log("Lower limit reac3hed");
                setYCoordinates({...yCoordinates, current: yCoordinates.max})
            } else {
                setYCoordinates({...yCoordinates, current: yCoordinates.current + e.deltaY})
            }
        } else {
            // User is scrolling up
            if (yCoordinates.current === yCoordinates.minVisible) {
                // && Math.abs(e.deltaY) > yCoordinates.minVisible
                // If they keep scrolling even further, dismiss the drawer
                console.log('Dismissing drawer');

                setIsOpen(!isOpen);
                // hasReachedTop = false;

            } else if ((yCoordinates.current - e.deltaY) > yCoordinates.minVisible) {
                console.log("Upper limit reached");
                // hasReachedTop = true;
                setYCoordinates({...yCoordinates, current: yCoordinates.minVisible});
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
                    onTouchStart={handleTouchStart}
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