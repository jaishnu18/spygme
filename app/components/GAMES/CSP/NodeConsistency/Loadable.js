/**
 *
 * Asynchronously loads the component for NodeConsistency
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
