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

    // useEffect(() => {
    //     document.addEventListener('scroll', handleScroll, true);
    // })

    useLayoutEffect(() => {
        if (null !== drawerEl.current) {
            setDrawerContentHeight(drawerEl.current.offsetHeight);
        }

        if (null !== drawerContentEl.current) {
            setYCoordinates({...yCoordinates, max: drawerContentEl.current.offsetHeight});
        }
    }, [])


    const handleScroll = (e:any) => {
        console.log(yCoordinates);
        console.log(e.deltaY);

        if (e.deltaY > 0) {
            console.log('scrolling down');
        } else {
            console.log('scrolling up');
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
                    onMouseDown={handleMouseDown}
                    style={ { transform: isOpen ? `translateY(${yCoordinates.current}px)` : 'translateY(100%)' } }  
                    >
                    <span className="drawer-handle-icon"></span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et scelerisque nisl. Vestibulum sem nibh, rhoncus ut consectetur non, consequat eget metus. Suspendisse quam purus, laoreet nec ligula id, malesuada malesuada purus. Praesent consectetur mi vitae ante sollicitudin, in scelerisque odio laoreet. Curabitur odio erat, auctor nec enim non, ullamcorper consequat nulla. Curabitur luctus mollis nisl, et pulvinar enim sagittis at. Sed diam risus, accumsan sed posuere sit amet, ultricies id velit. Sed scelerisque ex quis imperdiet ultricies. Pellentesque pellentesque purus sit amet fringilla elementum. Aenean pulvinar urna nec elit pharetra, eu bibendum sem malesuada. Sed semper laoreet nunc ut feugiat. Donec dignissim ex pulvinar, volutpat nulla eu, tincidunt metus. Suspendisse sit amet sapien odio. Mauris eu neque dui. Curabitur pharetra lorem sem, eget sollicitudin lorem consequat sed. Quisque faucibus ex eget tellus porta, quis dictum elit dapibus.
                    </p>
                    <p>
                        Integer tempor, augue a pellentesque dapibus, libero magna laoreet tortor, ac efficitur eros urna sed elit. Quisque congue at dui eu dignissim. Duis elit lectus, scelerisque consequat nibh et, bibendum efficitur magna. Ut congue, enim at ornare placerat, quam nisl tincidunt purus, sit amet efficitur lectus ligula et eros. Sed sagittis viverra velit, et sollicitudin sapien sagittis ut. Sed sodales dictum diam, at fermentum ex auctor id. Suspendisse potenti. Maecenas ornare sagittis neque, et varius purus pellentesque eget. Donec consectetur, risus ut ornare vehicula, neque velit pulvinar nulla, eu rhoncus quam massa ac quam. Sed egestas varius mattis. Mauris laoreet mi a augue accumsan sollicitudin. Aenean a libero ac neque gravida tincidunt id non urna. Donec vel tristique lectus, ut consectetur sem.
                    </p>

                    <p>
                        Donec placerat est at porttitor convallis. Integer fermentum volutpat ipsum eu porta. Praesent imperdiet nisi ac erat dignissim ultrices. Sed feugiat, justo eu lobortis semper, erat quam sagittis nunc, sed sagittis augue lectus ac nulla. Vestibulum a lorem varius, efficitur sem tristique, iaculis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ut ante eu metus eleifend maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla ut tincidunt augue. Suspendisse eget faucibus erat. Maecenas imperdiet, tellus sit amet varius viverra, est velit venenatis mi, finibus finibus nisi est eget nunc.
                    </p>

                    <p>
                        Aenean venenatis interdum odio, eget imperdiet ante pharetra tristique. Nam suscipit pulvinar faucibus. Sed semper velit sed nunc volutpat venenatis. Ut mollis pulvinar sapien non faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec porttitor nisi turpis, nec tincidunt diam feugiat ut. Morbi et est ligula. Nullam at varius libero. Ut eu elit id eros congue luctus nec sit amet mi. Nunc hendrerit nibh id dui cursus lacinia. Duis in ligula euismod, tristique turpis eget, tempus tellus.
                    </p>

                    <p>
                        Proin elit neque, dictum at egestas vitae, eleifend sed sem. Integer condimentum velit nec augue facilisis porta ac sit amet tortor. Proin mauris turpis, consectetur a libero non, ultricies ultricies ipsum. Nunc tincidunt et lectus vitae bibendum. Integer interdum imperdiet mauris eget tincidunt. Curabitur gravida bibendum auctor. Donec et placerat augue.
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;