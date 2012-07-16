// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.ControlGroup');

goog.require('clover.ui.ComponentContentHelper');
goog.require('clover.ui.form.ControlGroupRenderer');
goog.require('goog.events.EventHandler');
goog.require('goog.ui.Control');
goog.require('goog.ui.FormPost');
goog.require('goog.ui.registry');



/**
 * @param {?clover.ui.form.LabelContent=} opt_label A label of the control
 *     group, such as 'Address'.
 * @param {?clover.ui.form.BlockHelpContent=} opt_help A help text (or DOM
 *     structure) for the input.
 * @param {?clover.format.FormatLike=} opt_format A format like object that
 *     can validate the input.
 * @param {clover.ui.form.ControlGroupRenderer=} opt_renderer Renderer used to
 *     render or decorate the container; defaults to
 *     {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
clover.ui.form.ControlGroup = function(opt_label, opt_help, opt_format,
    opt_renderer, opt_domHelper) {
  goog.base(this, null, opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor), opt_domHelper);
  this.helper_ = new clover.ui.ComponentContentHelper(this, true);
  this.setContentInternal(opt_label || '', this.labelKey);
  this.setContentInternal(opt_help, this.blockHelpKey);

};
goog.inherits(clover.ui.form.ControlGroup, goog.ui.Control);


/**
 * @enum {string}
 */
clover.ui.form.ControlGroup.ControlGroupState = {
  NORMAL: 'normal',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  UNEDITABLED: 'uneditable',
  DISABLED: 'disabled'
};


/**
 * @type {string}
 * @private
 */
clover.ui.form.ControlGroup.prototype.controlGroupState_ =
    clover.ui.form.ControlGroup.ControlGroupState.NORMAL;


/**
 * @type {string}
 * @protected
 */
clover.ui.form.ControlGroup.prototype.labelKey = 'label';


/**
 * @type {string}
 * @protected
 */
clover.ui.form.ControlGroup.prototype.inlineHelpKey = 'inlinehelp';


/**
 * @type {string}
 * @protected
 */
clover.ui.form.ControlGroup.prototype.blockHelpKey = 'blockhelp';


/**
 * @type {string}
 * @private
 */
clover.ui.form.ControlGroup.prototype.required_ = false;


/**
 * @type {clover.format.FormatLike}
 * @private
 */
clover.ui.form.ControlGroup.prototype.format_ = null;


/**
 * @type {string}
 * @private
 */
clover.ui.form.ControlGroup.prototype.confirmed_ = false;


/**
 * @type {string}
 * @private
 */
clover.ui.form.ControlGroup.prototype.validated_ = false;


/**
 * Returns an input label element.
 * @return {Element} The input label element.
 */
clover.ui.form.ControlGroup.prototype.getLabelContentElement = function() {
  return this.getContentElement(this.labelKey);
};


/**
 * Returns the input label content.
 * @return {clover.ui.form.LabelContent} The input label.
 */
clover.ui.form.ControlGroup.prototype.getLabelContent = function() {
  return this.getContent(this.labelKey);
};


/**
 * Sets the input label.
 * @param {clover.ui.form.LabelContent} content The input label content.
 */
clover.ui.form.ControlGroup.prototype.setLabelContent = function(content) {
  this.setContent(content, this.labelKey);
};


/**
 * Returns a block help element for the input.
 * @return {Element} The element of inline help.
 */
clover.ui.form.ControlGroup.prototype.getBlockHelpContentElement = function() {
  return this.getContentElement(this.blockHelpKey);
};


/**
 * Returns a content of block help for the input.
 * @return {clover.ui.form.BlockHelpContent} The content of help for the input.
 */
clover.ui.form.ControlGroup.prototype.getBlockHelpContent = function() {
  return this.getContent(this.blockHelpKey);
};


/**
 * Sets a block help content for the the input.
 * @param {clover.ui.form.BlockHelpContent} content A block help content for
 *     the input.
 */
clover.ui.form.ControlGroup.prototype.setBlockHelpContent = function(content) {
  this.setContent(content, this.blockHelpKey);
};


/**
 * Returns a inline help element for the input.
 * @return {Element} The element of inline help.
 */
clover.ui.form.ControlGroup.prototype.getInlineHelpContentElement = function() {
  return this.getContentElement(this.inlineHelpKey);
};


/**
 * Returns a content of inline help for the input.
 * @return {clover.ui.form.InlineHelpContent} The content of help for the input.
 */
clover.ui.form.ControlGroup.prototype.getInlineHelpContent = function() {
  return this.getContent(this.inlineHelpKey);
};


/**
 * Sets a inline help content for the the input.
 * @param {clover.ui.form.InlineHelpContent} content A inline help content for
 *     the input.
 */
clover.ui.form.ControlGroup.prototype.setInlineHelpContent = function(content) {
  this.setContent(content, this.inlineHelpKey);
};


/**
 * Returns whether the component is required.
 * @param {boolean} required Whether the input is required.
 */
clover.ui.form.ControlGroup.prototype.setRequired = function(required) {
  this.required_ = required;
};


/**
 * Returns whether the component is required.
 * @return {boolean} Whether the input is required.
 */
clover.ui.form.ControlGroup.prototype.isRequired = function() {
  return this.required_;
};


/**
 * Returns whether the component is confirmed.
 * @return {boolean} Whether the input is confirmed.
 */
clover.ui.form.ControlGroup.prototype.isValidated = function() {
  return this.validated_;
};


/**
 * Returns whether the component is confirmed.
 * @return {boolean} Whether the input is confirmed.
 */
clover.ui.form.ControlGroup.prototype.isConfirmed = function() {
  return this.confirmed_;
};


/**
 * Sets the component confirmed.
 * @param {boolean} confirmed Whether the input is confirmed mode (then the
 *     element is not editable but not disable).
 */
clover.ui.form.ControlGroup.prototype.setConfirmed = function(confirmed) {
  this.confirmed_ = confirmed;
  this.renderer_.setConfirmed(this, confirmed);
};


/**
 * Returns whether the component is valid.
 * @return {boolean} Whether the input is valid.
 */
clover.ui.form.ControlGroup.prototype.isValid = function() {
  this.validated_ = true;
  return this.format_ ? this.format_.isValid(this) : true;
};


/**
 * Sets the component valid.
 * @param {boolean} valid Whether the input is valid.
 */
clover.ui.form.ControlGroup.prototype.setValid = function(valid) {
  this.valid_ = valid;
  this.renderer_.setValid(this, valid);
};


/**
 * Returns the input state.
 * @return {clover.ui.form.ControlGroup.ControlGroupState} the input state such
 *     as warning, error, successful.
 */
clover.ui.form.ControlGroup.prototype.getControlGroupState = function() {
  return this.controlGroupState_;
};


/**
 * Sets an input state.
 * @param {clover.ui.form.ControlGroup.ControlGroupState} state A input state
 *     such as warning, error, successful.
 */
clover.ui.form.ControlGroup.prototype.setControlGroupState = function(state) {
  this.controlGroupState_ = state;
  this.getRenderer().setControlGroupState(this, state);
};


goog.ui.registry.setDefaultRenderer(
    clover.ui.form.ControlGroup, clover.ui.form.ControlGroupRenderer);
