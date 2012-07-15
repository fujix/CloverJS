// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.TextInput');

goog.require('clover.ui.form.ControlGroup');
goog.require('goog.ui.LabelInput');



/**
 * @param {?clover.format.Formatable=} opt_format A format object that
 *     validate the input.
 * @param {clover.ui.form.AbstractFormRenderer=} opt_renderer Renderer used to
 *     render or decorate the container; defaults to
 *     {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {clover.ui.form.Input}
 */
clover.ui.form.TextInput = function(opt_format, opt_renderer, opt_domHelper) {
  goog.base(this, opt_format, opt_renderer, opt_domHelper);
};
goog.inherits(clover.ui.form.Form, clover.ui.form.ControlGroupInput);


/**
 *
 */
clover.ui.form.TextInput.prototype.setPlaceHolder = function(text) {
  
};
