/**
 *
 * Asynchronously loads the component for PruneSearch
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
