/**
 *
 * Asynchronously loads the component for NavigationBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
