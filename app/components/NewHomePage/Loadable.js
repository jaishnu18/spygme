/**
 *
 * Asynchronously loads the component for NewHomePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
