/**
 * @flow
 */

import AppNavigator from '../navigations';

/* eslint-disable import/prefer-default-export */
export const navState = (state, action) => {
  switch (action.type) {
    default:
      if (action.type === 'Navigation/NAVIGATE') {
        const { routes } = state;
        const { routeName } = action;

        const currentRoute = routes[routes.length - 1];
        if (currentRoute.routeName === routeName) {
          return state;
        }
      }

      return AppNavigator.router.getStateForAction(action, state);
  }
};
