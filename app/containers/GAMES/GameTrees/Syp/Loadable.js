/**
 *
 * Asynchronously loads the component for Syp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
