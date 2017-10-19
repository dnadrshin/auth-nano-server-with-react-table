import React from 'react';

const
    Icon = ({type, action}) => <i
        className="material-icons"
        style={{cursor: 'pointer'}}
        onClick={action}>
            {type}
        </i>;

export default Icon;
