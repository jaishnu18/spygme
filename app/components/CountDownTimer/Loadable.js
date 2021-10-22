/**
 *
 * Asynchronously loads the component for CountDownTimer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
