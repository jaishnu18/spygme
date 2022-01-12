/**
 *
 * Asynchronously loads the component for H4
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
