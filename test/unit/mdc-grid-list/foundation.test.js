/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {assert} from 'chai';
import td from 'testdouble';

import {setupFoundationTest} from '../helpers/setup';
import {verifyDefaultAdapter} from '../helpers/foundation';
import MDCGridListFoundation from '../../../packages/mdc-grid-list/foundation';

suite('MDCGridListFoundation');

test('exports strings', () => {
  assert.isOk('strings' in MDCGridListFoundation);
});

test('defaultAdapter returns a complete adapter implementation', () => {
  verifyDefaultAdapter(MDCGridListFoundation, [
    'getOffsetWidth', 'getTileOffsetWidthAtIndex', 'setTilesWidth',
    'registerResizeHandler', 'deregisterResizeHandler',
  ]);
});

const setupTest = () => setupFoundationTest(MDCGridListFoundation);

test('#init calls component event registrations and align center function', () => {
  const {foundation, mockAdapter} = setupTest();

  foundation.init();
  td.verify(foundation.alignCenter());
  td.verify(mockAdapter.registerResizeHandler(td.matchers.isA(Function)));
});

test('#destroy calls component event deregistrations', () => {
  const {foundation, mockAdapter} = setupTest();

  let resizeHandler;
  td.when(mockAdapter.registerResizeHandler(td.matchers.isA(Function))).thenDo((handler) => {
    resizeHandler = handler;
  });

  foundation.init();
  foundation.destroy();
  td.verify(mockAdapter.deregisterResizeHandler(resizeHandler));
});

test('#align center sets the container width to fit tiles inside', () => {
  const {foundation, mockAdapter} = setupTest();
  const listOffsetWidth = 1005;
  const tileOffsetWidth = 200;
  const tilesWidth = Math.floor(listOffsetWidth / tileOffsetWidth) * tileOffsetWidth;
  td.when(mockAdapter.getOffsetWidth()).thenReturn(listOffsetWidth);
  td.when(mockAdapter.getTileOffsetWidthAtIndex(0)).thenReturn(tileOffsetWidth);
  foundation.init();

  foundation.alignCenter();
  td.verify(mockAdapter.setTilesWidth(tilesWidth));
});
