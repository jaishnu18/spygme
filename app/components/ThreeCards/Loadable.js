/**
 *
 * Asynchronously loads the component for ThreeCards
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
