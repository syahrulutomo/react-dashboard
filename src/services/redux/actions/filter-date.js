import * as actionTypes from './action-types';

export const setStartDate = (startDate) => {
  return {
    type: actionTypes.SET_START_DATE,
    startDate,
  };
};

export const setEndDate = (endDate) => {
  return {
    type: actionTypes.SET_END_DATE,
    endDate,
  };
};
