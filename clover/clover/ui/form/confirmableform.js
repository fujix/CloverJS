// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.ConfirmableForm');



/**
 * @param {clover.ui.form.AbstractFormRenderer=} opt_renderer Renderer used to
 *     render or decorate the container; defaults to
 *     {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {clover.ui.form.ValidatableForm}
 */
clover.ui.form.ConfirmableForm = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer, opt_domHelper);
};
goog.inherits(clover.ui.form.ConfirmableForm, clover.ui.form.ValidatableForm);


/** @enum {string} */
clover.ui.form.ConfirmableForm.EventType = {
};


/**
 * @type {boolean}
 * @private
 */
clover.ui.form.ConfirmableForm.prototype.confirming_ = false;


/**
 * Confirms input.
 */
clover.ui.form.ConfirmableForm.prototype.confirm = function() {
  if (this.isValied()) {
    this.confirm_();
  } else {
    this.validate();
  }
};


/**
 * Makes confirm mode to children.
 * @private
 */
clover.ui.form.ConfirmableForm.prototype.confirm_ = function() {
  this.confirming_ = true;
  this.forEachChild(function(child) {
    if (child.confirm) child.confirm();
  });
};
