/**
 *
 * Asynchronously loads the component for VideoRecorder
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
