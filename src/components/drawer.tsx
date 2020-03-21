import React, { Fragment, useState, useEffect } from 'react';

const Drawer = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        console.log(isOpen);
    });

    const handleTriggerDrawer = (e:Object) => {
        setIsOpen(!isOpen);
    }
    
    return (
        <Fragment>
            <button className="dev-button" onClick={handleTriggerDrawer}>Toggle Drawer</button>
            {/* Main Wrapper */}
            <div className={ isOpen ? 'drawer-container open' : 'drawer-container'}>
                {/* Main Drawer Content */}
                <div className="drawer-background" onClick={handleTriggerDrawer}></div>
                <div className="drawer">
                    <span>Hello from Drawer!</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Drawer;