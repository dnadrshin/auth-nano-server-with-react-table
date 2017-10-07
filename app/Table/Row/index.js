import React from 'react';

const
    Row = ({data, columns}) => <tr>
        {columns.map((column, i) => <td key={`${data.id}-col-${i}`}>{data[column.key]}</td>)}
    </tr>;

export default Row;
