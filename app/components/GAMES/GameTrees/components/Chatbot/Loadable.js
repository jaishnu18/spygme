/**
 *
 * Asynchronously loads the component for Chatbot
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
