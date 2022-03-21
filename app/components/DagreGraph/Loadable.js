/**
 *
 * Asynchronously loads the component for DagreGraph
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
