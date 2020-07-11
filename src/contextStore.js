import React from 'react';
import routeReducer from '@/reducers/route';
import pageOptionsReducer from '@/reducers/pageOptions';

export const routeInitialState = {
  path: '/',
  fullPath: '/',
};

export const pageOptionsInitialState = {
  closedAlerts: [],
};

const ContextStore = React.createContext({
  route: routeInitialState,
  pageOptions: pageOptionsInitialState,
});

export const ContextStoreProvider = props => {
  const { initialStore = {} } = props;

  const [routeState, routeDispatch] = React.useReducer(routeReducer, {
    ...routeInitialState,
    ...initialStore.route,
  });

  const [pageOptionsState, pageOptionsDispatch] = React.useReducer(
    pageOptionsReducer,
    {
      ...pageOptionsInitialState,
      ...initialStore.pageOptions,
    }
  );

  return (
    <ContextStore.Provider
      value={{
        route: {
          state: routeState,
          dispatch: routeDispatch,
        },
        pageOptions: {
          state: pageOptionsState,
          dispatch: pageOptionsDispatch,
        },
      }}
      {...props}
    />
  );
};

export default ContextStore;
