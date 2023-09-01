import { NavigationActions, StackActions } from 'react-navigation';

export function navigate(screenName, params) {
  return NavigationActions.navigate({
    routeName: screenName,
    params,
  });
}

export function reset(routeStack: Array, params: any, index = 0) {
  const newStack = [];
  routeStack.forEach((item) =>
    newStack.push(NavigationActions.navigate({ routeName: item, params }))
  );
  return StackActions.reset({
    index,
    actions: newStack,
    key: null,
  });
}

export function resetTab(routeTab: string, params: any, index = 0) {
  const newStack = [];
  newStack.push(
    NavigationActions.navigate({
      routeName: 'HomeTabScreen',
      action: NavigationActions.navigate({
        routeName: routeTab,
      }),
    })
  );
  return StackActions.reset({
    index,
    actions: newStack,
    key: null,
  });
}

export function goBack(screen, navState = null) {
  // screen: screen after screen want to go back
  let screenKey = screen;
  if (navState) {
    // eslint-disable-next-line array-callback-return
    navState.routes.map((navData) => {
      console.log('navData', navData);
      if (navData.routeName === screen) {
        console.log('navData.key', navData.key);
        screenKey = navData.key;
      }
    });
  }
  console.log('screenKey', screenKey);
  return NavigationActions.back({ key: screenKey });
}

export function goBackToFirstPageDuplicate(screen, navState = null) {
  // screen: screen after screen want to go back
  let screenKey = screen;
  if (navState) {
    // eslint-disable-next-line array-callback-return
    const keyPage = navState.routes.filter(
      (navData) => navData.routeName === screen
    );

    screenKey = keyPage.find((x) => x.routeName === screen).key;
  }
  console.log('screenKey', screenKey);
  return NavigationActions.back({ key: screenKey });
}
