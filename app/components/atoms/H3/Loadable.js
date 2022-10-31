/**
 *
 * Asynchronously loads the component for H3
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
