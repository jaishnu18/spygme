/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-restricted-globals */

export function getHighlightedIndexLoggedIn(location) {
  console.log(location);
  switch (location) {
    case '/my/profile':
      return '3';
    case '/topics':
      return '2';
    case '/dashboard':
      console.log(location);
      return '1';
  }
}

export function getHighlightedIndexLoggedOut(location) {
  switch (location) {
    case '/auth':
      return '3';
    case '/about':
      return '2';
    case '/':
      return '1';
  }
}
