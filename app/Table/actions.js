import keyMirror from 'keymirror';

const
    toggleSorting = (key, column) => ({column, key, type: types.TABLE_TOGGLE_SORTING}),

    types = keyMirror({
        TABLE_TOGGLE_SORTING: null,
    });

export default {types, toggleSorting};
