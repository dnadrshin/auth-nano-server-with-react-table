import React from 'react';

const
    Icon = ({type, action}) => <i className="material-icons" onClick={action}>{type}</i>

export default Icon;
