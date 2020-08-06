import { updateObject } from '@/utilities';
import * as actionTypes from '../actions/action-types';

const initialState = {
  open: true,
};

const openSidebar = (state) => {
  return updateObject(state, { open: true });
};

const closeSidebar = (state) => {
  return updateObject(state, { open: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_SIDEBAR: return openSidebar(state, action);
    case actionTypes.CLOSE_SIDEBAR: return closeSidebar(state, action);
    default: return state;
  }
};

export default reducer;
