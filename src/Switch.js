import React from 'react';

export default ({on, onClick}) => {
    return (
        <div onClick={onClick} className={on ? 'switch switch--on' : 'switch'}>
            <span className='toggler'></span>
        </div>
    )
}