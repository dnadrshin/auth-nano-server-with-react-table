import keyMirror from 'keymirror';

const
    types = keyMirror({
        TABLE_TOGGLE_SORTING: null,
    }),

    toggleSorting = (key, column) => ({column, key, type: types.TABLE_TOGGLE_SORTING});

export default {types, toggleSorting};
