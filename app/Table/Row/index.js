import React from 'react';
import Icon from './Icon';
import {convertFieldValue as converter} from '../../generic/helpers'

const
    Row = ({data, columns}) => <tr>
        {columns.map((column, i) => <td key={`${data.id}-col-${i}`}>
            {!column.isServiceField
                ? converter(data[column.name], column.type)

                : <Icon
                    type={column.name}
                    action={column.action}
                />}
        </td>)}
    </tr>;

export default Row;
