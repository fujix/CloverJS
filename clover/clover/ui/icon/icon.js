// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Available icon types.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.icon.Icon');
goog.require('clover.ui.MinimumComponent');
goog.require('clover.ui.icon.IconType');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.ui.registry');



/**
 * @param {clover.ui.icon.IconType} type The type of icon.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.MinimumComponent}
 */
clover.ui.icon.Icon = function(type, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.setTypeInternal(type);
};
goog.inherits(clover.ui.icon.Icon, clover.ui.MinimumComponent);


/**
 * @param {clover.ui.icon.IconType} type Type of icon.
 */
clover.ui.icon.Icon.prototype.setType = function(type) {
  this.setTypeInternal(type);
  var elem = this.getElement();
  if (elem) {
    var classes = goog.object.getValues(clover.ui.icon.IconType);
    goog.dom.classes.addRemove(elem, classes, type);
  }
};


/**
 * @return {clover.ui.icon.IconType} Type of icon.
 */
clover.ui.icon.Icon.prototype.getType = function() {
  return this.type_;
};


/**
 * @param {clover.ui.icon.IconType} type Type of icon.
 */
clover.ui.icon.Icon.prototype.setTypeInternal = function(type) {
  goog.asserts.assert(goog.object.contains(clover.ui.icon.IconType, type));
  this.type_ = type;
};


/** @override */
clover.ui.icon.Icon.prototype.createDom = function() {
  var dom = this.getDomHelper();
  var icon = dom.createDom('i');
  this.decorateInternal(icon);
  this.setElementInternal(icon);
};


/** @override */
clover.ui.icon.Icon.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.setType(this.type_);
};


/** @override */
clover.ui.icon.Icon.prototype.disposeInternal = function(element) {
  goog.base(this, 'disposeInternal', element);
  delete this.type_;
};


// Register a decorator factory function for Icon
goog.object.forEach(clover.ui.icon.IconType, function(type) {
  goog.ui.registry.setDecoratorByClassName(type, function() {
    return new clover.ui.icon.Icon(type);
  });
});
