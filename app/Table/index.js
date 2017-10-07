// @flow
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import Row from './Row';

const
    extendColumns: Array<{name: string, key: string}> = (columns: Array<{name: string, key: string}>) => columns.push({name: 'Edit'}, {name: 'Delete'}),

    Table = ({data, columns}) => <table>
        <tbody>
            <tr>
                {(columns).map((column, i) => <th key={i}>{column.name}</th>)}
            </tr>

            {data
                ? data.map((row, i) => <Row data={row} columns={columns} key={row.id}/>)
                : <tr>no data</tr>
            }
        </tbody>
    </table>;

export default connect()(Table);
