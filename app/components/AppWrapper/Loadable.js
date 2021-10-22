/**
 *
 * Asynchronously loads the component for AppWrapper
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
