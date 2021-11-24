/**
 *
 * Asynchronously loads the component for AppStructure
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
