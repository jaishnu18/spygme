/**
 *
 * Asynchronously loads the component for P
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
