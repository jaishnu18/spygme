/**
 *
 * Asynchronously loads the component for GameBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
