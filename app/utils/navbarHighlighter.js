/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-restricted-globals */

export function getHighlightedIndexLoggedIn(location) {
  switch (location) {
    case '/my/stats':
      return '5';
    case '/my/profile':
      return '4';
    case '/discuss':
      return '3';
    case '/topics':
      return '2';
    case '/dashboard':
      return '1';
    default:
      return '1';
  }
}

export function getHighlightedIndexLoggedOut(location) {
  switch (location) {
    case '/auth':
      return '4';
    case '/':
      return '1';
  }
}
