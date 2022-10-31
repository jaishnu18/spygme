/**
 *
 * Asynchronously loads the component for PlugNPlayPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
