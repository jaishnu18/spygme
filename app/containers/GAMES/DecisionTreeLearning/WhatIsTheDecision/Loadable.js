/**
 *
 * Asynchronously loads the component for WhatIsTheDecision
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
