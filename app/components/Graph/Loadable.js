/**
 *
 * Asynchronously loads the component for Graph
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
