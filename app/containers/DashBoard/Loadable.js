/**
 *
 * Asynchronously loads the component for DashBoard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
