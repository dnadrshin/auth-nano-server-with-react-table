import _ from 'lodash';
import actions from './actions';
import reduce from 'generic/helpers/reduce';

export default (state = {}, action) => reduce(state, action, {
    [actions.types.TABLE_TOGGLE_SORTING]: () => {
        return {
            ...state,

            [action.key]: {
                ...state[action.key],

                sorting: _.get(state[action.key], 'sorting.column') === action.column
                    ? state[action.key].sorting.order === 'asc'
                        ? {column: action.column, order: 'desc'}
                        : {column: action.column, order: 'asc'}

                    : {column: action.column, order: 'asc'},
            },
        };
    },
});
