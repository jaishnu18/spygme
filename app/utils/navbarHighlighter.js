/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-restricted-globals */
import history from 'utils/history';

export function getHighlightedIndexLoggedIn() {
  switch (history.location.pathname) {
    case '/about':
      return '4';
    case '/profile':
      return '3';
    case '/dashboard':
      return '2';
    case '/':
      return '1';
  }
}

export function getHighlightedIndexLoggedOut() {
  switch (history.location.pathname) {
    case '/auth/login':
      return '3';
    case '/auth/signup':
      return '3';
    case '/about':
      return '2';
    case '/':
      return '1';
  }
}
