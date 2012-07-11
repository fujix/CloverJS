// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Minimum component that cannot has a child.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.MinimumComponent');
goog.require('goog.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.MinimumComponent = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(clover.ui.MinimumComponent, goog.ui.Component);


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.addChild = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.addChildAt = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.getChild = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.getChildAt = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.getChildIds = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.forEachChild = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.removeChild = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.removeChildAt = goog.nullFunction;


/**
 * Minimum component cannot have a child.
 * This method do not anything.
 * @override
 */
clover.ui.MinimumComponent.prototype.removeChildren = goog.nullFunction;
