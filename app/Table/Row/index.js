import React from 'react';
import Icon from './Icon';

const
    Row = ({data, columns}) => <tr>
        {columns.map((column, i) => <td key={`${data.id}-col-${i}`}>
            {!column.isServiceField
                ? data[column.name]

                : <Icon
                    type={column.name}
                    action={column.action}
                />}
        </td>)}
    </tr>;

export default Row;
