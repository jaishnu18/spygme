/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOGIN_USER_WITH_EMAIL = 'app/App/LOGIN_USER_WITH_EMAIL';
export const LOGIN_USER_WITH_EMAIL_SUCCESS =
  'app/App/LOGIN_USER_WITH_EMAIL_SUCCESS';
export const LOGIN_USER_WITH_EMAIL_ERROR =
  'app/App/LOGIN_USER_WITH_EMAIL_ERROR';

export const LOGOUT_START = 'app/App/LOGOUT_START';
export const LOGOUT_SUCCESS = 'app/App/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'app/App/LOGOUT_FAILURE';
