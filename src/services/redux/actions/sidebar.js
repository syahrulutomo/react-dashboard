import * as actionTypes from './action-types';

export const openSidebar = () => {
  return {
    type: actionTypes.OPEN_SIDEBAR,
  };
};

export const closeSidebar = () => {
  return {
    type: actionTypes.CLOSE_SIDEBAR,
  };
};
