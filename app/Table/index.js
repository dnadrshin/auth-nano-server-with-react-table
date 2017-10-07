// @flow
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import Row from './Row';

const
    extendColumns = columns => columns.concat(
        {title: 'Edit', name: 'mode edit', isServiceField: true, action: () => {console.log(123)}}, 
        {title: 'Delete', name: 'delete', isServiceField: true, action: () => {}},
    ),

    Table = ({data, columns}) => <table>
        <tbody>
            <tr>
                {extendColumns(columns).map((column, i) => <th key={i}>{column.title}</th>)}
            </tr>

            {data
                ? data.map((row, i) => <Row data={row} columns={extendColumns(columns)} key={row.id}/>)
                : <tr>no data</tr>
            }
        </tbody>
    </table>;

export default connect()(Table);
