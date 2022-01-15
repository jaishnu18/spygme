/**
 *
 * Asynchronously loads the component for MyProfilePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
