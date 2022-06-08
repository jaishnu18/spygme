/**
 *
 * Asynchronously loads the component for PlugNPlayMain
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
