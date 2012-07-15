// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.FieldSet');

goog.require('clover.ui.ComponentContentHelper');
goog.require('clover.ui.form.FieldSetRenderer');
goog.require('goog.ui.Container');
goog.require('goog.ui.registry');



/**
 * A container of {@link clover.ui.form.ControlGroup}.
 * @param {?clover.ui.form.FieldSetContent=} opt_legend A legend of the control
 *     group, such as 'User Information'. Labels such as 'Password' or
 *     'Username' is NOT legend, then you should use {@link
 *     clover.ui.form.ControlGroup#setLabel}.
 * @param {?clover.ui.form.FieldSetRenderer=} opt_renderer Renderer used to
 *     render or decorate the fieldset.
 * @param {?goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {goog.ui.Container}
 */
clover.ui.form.FieldSet = function(opt_legend, opt_renderer, opt_domHelper) {
  goog.base(this, goog.ui.Container.Orientation.VERTICAL, opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor), opt_domHelper);

  this.helper_ = new clover.ui.ComponentContentHelper(this, true);
  this.setContentInternal(opt_legend, 'legend');
};
goog.inherits(clover.ui.form.FieldSet, goog.ui.Container);


/** @override */
clover.ui.form.FieldSet.prototype.isFocusable = function() {
  return false;
};


/**
 * @param {clover.ui.form.LegendContent} content Content to render.
 */
clover.ui.form.FieldSet.prototype.setLegendContent = function(content) {
  this.setContent(content, 'legend');
};


/**
 * @param {clover.ui.form.LegendContent} content Content to render.
 */
clover.ui.form.FieldSet.prototype.getLegendContent = function(content) {
  var content = this.getContent('legend')
  return content;
};


/**
 * Returns whether the component is confirmed.
 * @return {boolean} Whether the input is confirmed.
 */
clover.ui.form.FieldSet.prototype.isValidated = function() {
  var validated = true;
  this.forEachChild(function(child) {
    if (child.isValidated && !child.isValidated()) validated = false;
  });
  return validated;
};


/**
 * Returns whether the component is confirmed.
 * @return {boolean} Whether the input is confirmed.
 */
clover.ui.form.FieldSet.prototype.isConfirmed = function() {
  var confirmed = true;
  this.forEachChild(function(child) {
    if (child.isConfirmed && !child.isConfirmed()) confirmed = false;
  });
  return confirmed;
};


/**
 * Sets the component confirmed.
 * @param {boolean} confirmed Whether the input is confirmed mode (then the
 *     element is not editable but not disable).
 */
clover.ui.form.FieldSet.prototype.setConfirmed = function(confirmed) {
  this.forEachChild(function(child) {
    if (child.setConfirmed) child.setConfirmed(confirmed);
  });
};


/**
 * Returns whether the component is valid.
 * @return {boolean} Whether the input is valid.
 */
clover.ui.form.FieldSet.prototype.isValid = function() {
  var valid = true;
  this.forEachChild(function(child) {
    if (child.isValid && !child.isValid()) valid = false;
  });
  return valid;
};


/**
 * Sets the component valid.
 * @param {boolean} valid Whether the input is valid.
 */
clover.ui.form.FieldSet.prototype.setValid = function(valid) {
  this.forEachChild(function(child) {
    if (child.setValid) child.isSetValid(valid);
  });
};


goog.ui.registry.setDefaultRenderer(
    clover.ui.form.FieldSet, clover.ui.form.FieldSetRenderer);
