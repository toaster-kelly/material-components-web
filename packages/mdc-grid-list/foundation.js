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

import {MDCFoundation} from '@material/base';
import {strings} from './constants';

export default class MDCGridListFoundation extends MDCFoundation {
  static get strings() {
    return strings;
  }

  static get defaultAdapter() {
    return {
      getOffsetWidth: () => /* number */ 0,
      getTileOffsetWidthAtIndex: (/* index: number | null */) => /* number */ 0,
      setTilesWidth: (/* value: number | null */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
    };
  }
  constructor(adapter) {
    super(Object.assign(MDCGridListFoundation.defaultAdapter, adapter));
    this.resizeHandler_ = () => this.alignCenter();
  }
  init() {
    this.alignCenter();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }
  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }
  alignCenter() {
    const gridWidth = this.adapter_.getOffsetWidth();
    const itemWidth = this.adapter_.getTileOffsetWidthAtIndex(0);
    this.adapter_.setTilesWidth(itemWidth * Math.floor(gridWidth / itemWidth));
  }
}
