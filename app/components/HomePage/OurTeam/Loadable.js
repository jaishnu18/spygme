/**
 *
 * Asynchronously loads the component for OurTeam
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
