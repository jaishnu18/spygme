/**
 *
 * Asynchronously loads the component for Tree
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
