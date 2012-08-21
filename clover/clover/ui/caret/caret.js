// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Available icon types.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.Caret');
goog.provide('clover.ui.CaretRenderer');

goog.require('goog.ui.Component');
/*goog.require('goog.ui.ComponentRenderer');*/



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.Caret = function(opt_domHelper) {
  goog.base(this, null, opt_domHelper);
};
goog.inherits(clover.ui.Caret, goog.ui.Component);
goog.addSingletonGetter(clover.ui.Caret);


clover.ui.Caret.prototype.createDom = function() {
  
};
