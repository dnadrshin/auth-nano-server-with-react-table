// @flow
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import Row from './Row';
import actions from './actions';

const
    extendColumns = columns => columns.concat(
        {title: 'Edit', name: 'mode edit', isServiceField: true, action: () => {console.log(123)}}, 
        {title: 'Delete', name: 'delete', isServiceField: true, action: () => {}},
    ),

    Table = ({data, columns, columnSettings, module, toggleSorting}) => <table>
        <tbody>
            <tr>
                {extendColumns(columns).map((column, i) => 
                <th
                    key={`${module}-header-${i}`}
                    onClick={column.isSorted ? () => toggleSorting(module, column.name): () => {console.log('not sort')}}
                >
                    {column.title}

                    {column.isSorted && !_.get(columnSettings,'sorting.order')
                        ? <i className="material-icons">swap_vert</i>
                        : ''
                    }

                    {_.get(columnSettings,'sorting.column') === column.name
                        ? _.get(columnSettings,'sorting.order') === 'asc' 
                            ? <i className="material-icons">arrow_downward</i>
                            : <i className="material-icons">arrow_upward</i>
                        : ''}
                </th>)}
            </tr>

            {data
                ? data.map((row, i) => <Row data={row} columns={extendColumns(columns)} key={row.id}/>)
                : <tr>no data</tr>
            }
        </tbody>
    </table>;

export default connect(
    (state, props) => ({
        columnSettings: state.table[props.module],
    }),

    ({
        toggleSorting: actions.toggleSorting,
    })
)(Table);
