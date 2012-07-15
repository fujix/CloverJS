// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.ValidatableForm');

goog.require('clover.ui.form.Validatable');
goog.require('goog.array');



/**
 * @param {clover.ui.form.AbstractFormRenderer=} opt_renderer Renderer used to
 *     render or decorate the container; defaults to
 *     {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {clover.ui.form.Form}
 */
clover.ui.form.ValidatableForm = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer, opt_domHelper);
};
goog.inherits(clover.ui.form.ValidatableForm, clover.ui.form.Form);


/**
 * @type {boolean}
 * @private
 */
clover.ui.form.ValidatableForm.prototype.validating_ = false;


/**
 * Returns whether inputs are valied. Returns true, if all children is are
 * valied.
 * @return {boolean} Whether inputs are valied.
 */
clover.ui.form.ValidatableForm.prototype.isValied = function() {
  return !this.getInvaliedChildren().length;
};


/**
 * Validates all children.
 */
clover.ui.form.ValidatableForm.prototype.validate = function() {
  var i = 0;
  goog.array.forEach(this.getInvaliedChildren(), function(validatable) {
    validatable.setInvalied(true);
    ++i;
  });
  this.validating_ = !!i;
};


/**
 * Returns invalied children.
 * @return {Array.<Validatable>} Invalied objects.
 */
clover.ui.form.ValidatableForm.prototype.getInvaliedChildren = function() {
  var notValied = [];
  this.forEachChild(function(child) {
    var result = clover.ui.form.Validatable.isValied(child);
    if (!result) notValied.push(child);
  });
  return child;
};
