/**
 *
 * Asynchronously loads the component for Crossword
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
