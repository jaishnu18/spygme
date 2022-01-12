/**
 *
 * Asynchronously loads the component for H1
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
