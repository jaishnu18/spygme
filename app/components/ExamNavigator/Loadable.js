/**
 *
 * Asynchronously loads the component for ExamNavigator
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
