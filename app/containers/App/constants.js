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

export const SIGNIN_START = 'app/Auth/SIGNIN_START';
export const SIGNIN_SUCCESS = 'app/Auth/SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'app/Auth/SIGNIN_FAILURE';

export const SIGNUP_START = 'app/Auth/SIGNUP_START';
export const SIGNUP_SUCCESS = 'app/Auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'app/Auth/SIGNUP_FAILURE';

export const SIGNOUT_START = 'app/Auth/SIGNOUT_START';
export const SIGNOUT_SUCCESS = 'app/Auth/SIGNOUT_SUCCESS';
export const SIGNOUT_FAILURE = 'app/Auth/SIGNOUT_FAILURE';
