import _ from 'lodash';
import React from 'react';
import Icon from './Icon';
import {convertFieldValue as converter} from 'generic/helpers'

const
    Row = ({data, columns, actions}) => <tr>
        {columns.map((column, i) => <td key={`${data._id}-col-${i}`}>
            {!column.isServiceField
                ? converter(_.get(data, column.name), column.type)

                : <Icon
                    type={column.name}
                    action={actions[column.type](data._id)}
                />}
        </td>)}
    </tr>;

export default Row;
