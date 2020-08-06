import { updateObject } from '@/utilities';
import * as actionTypes from '../actions/action-types';

const initialState = {
  startDate: '',
  endDate: '',
};

const setStartDate = (state, action) => {
  return updateObject(state, { startDate: action.starDate });
};

const setEndDate = (state, action) => {
  return updateObject(state, { endDate: action.endDate });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_START_DATE: return setStartDate(state, action);
    case actionTypes.SET_END_DATE: return setEndDate(state, action);
    default: return state;
  }
};

export default reducer;
