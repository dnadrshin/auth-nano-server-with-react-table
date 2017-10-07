export default (state = false, action, availableActions = {}) => (availableActions[action.type] || (() => state))();
