/**
 *
 * Asynchronously loads the component for SimpleCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
