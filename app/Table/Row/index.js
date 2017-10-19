import _ from 'lodash';
import React from 'react';
import {convertFieldValue as converter} from 'generic/helpers';
import Icon from './Icon';

const
    Row = ({data, columns, actions}) => <tr>
        {columns.map((column) => <td key={`${data._id}-col-${column.name}`}>
            {!column.isServiceField
                ? converter(_.get(data, column.name), column.type)

                : <Icon
                    type={column.name}
                    action={actions[column.type](data._id)}
                />}
        </td>)}
    </tr>;

export default Row;
