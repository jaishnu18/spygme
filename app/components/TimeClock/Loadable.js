/**
 *
 * Asynchronously loads the component for TimeClock
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
