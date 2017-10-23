// @flow
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {compose, lifecycle, withHandlers} from 'recompose';
import Row from './Row';
import actions from './actions';
import styles from './assets/component.css';

const
    extendColumns = (columns, actionsColumns) => actionsColumns ? columns.concat(actionsColumns) : columns,

    Table = ({
        actionsColumns, columns, columnSettings, data, module, sorting, toggleSorting, entityActions
    }) => <x-table class={classNames(styles.mainTable, styles.className)}>
        <table>
            <tbody>
                <tr>
                    {extendColumns(columns, actionsColumns).map((column, i) =>
                    <th
                        key={`${module}-header-${i}`}
                        onClick={column.isSorted ? () => sorting(module, column.name) : () => {console.log('not sort')}}
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
                    ? data.map(row => <Row
                        data={row}
                        columns={extendColumns(columns, actionsColumns)}
                        key={row._id}
                        actions={entityActions}
                    />)

                    : <tr><td>no data</td></tr>
                }
            </tbody>
        </table>
    </x-table>;

export default compose(
    connect(
        (state, props) => ({
            columnSettings: state.table[props.module],
        }),

        ({
            toggleSorting: actions.toggleSorting,
        }),
    ),

    withHandlers({
        sorting: props => (module, column, sortBy) => {
            props.toggleSorting(module, column, sortBy);
            setTimeout(() => props.submit(), 0);
        }
    })
)(Table);
