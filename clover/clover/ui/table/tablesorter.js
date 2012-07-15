// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A table sorting decorator.
 *
 * @author robbyw@google.com (Robby Walker)
 * @see ../demos/tablesorter.html
 */

goog.provide('clover.ui.TableSorter');
goog.require('goog.ui.TableSorter');



/**
 * A table sorter allows for sorting of a table by column.  This component can
 * be used to decorate an already existing TABLE element with sorting
 * features.
 *
 * The TABLE should use a THEAD containing TH elements for the table column
 * headers.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.TableSorter = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(clover.ui.TableSorter, goog.ui.TableSorter);


/** @override */
clover.ui/TableSorter.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal');
  var table = this.getElement();
  var headerRow = table.tHead.rows[this.sortableHeaderRowIndex_];
};


/** @override */
clover.ui.TableSorter.prototype.enterDocument = function() {
  clover.ui.TableSorter.superClass_.enterDocument.call(this);

  var table = this.getElement();
  var headerRow = table.tHead.rows[this.sortableHeaderRowIndex_];

  this.getHandler().listen(headerRow, goog.events.EventType.CLICK, this.sort_);
};
