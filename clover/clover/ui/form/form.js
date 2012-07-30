// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.Form');
goog.provide('clover.ui.form.Form.FormType');

goog.require('clover.ui.ComponentContentHelper');
goog.require('clover.ui.ComponentToRendererSystem');
goog.require('clover.ui.form.FormRenderer');
goog.require('goog.events.EventHandler');
goog.require('goog.ui.Component');
goog.require('goog.ui.FormPost');
goog.require('goog.ui.registry');



/**
 * @param {?string=} opt_formType Form type.
 * @param {clover.ui.form.FormRenderer=} opt_renderer Renderer used to
 *     render or decorate the container; defaults to
 *     {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @constructor
 * @extends {goog.ui.FormPost}
 */
clover.ui.form.Form = function(opt_formType, opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  clover.ui.ComponentToRendererSystem.initializeMixin(
      this, opt_renderer);
  if (opt_formType) this.formType_ = opt_formType;
  this.helper = new clover.ui.ComponentContentHelper(this, true);
};
goog.inherits(clover.ui.form.Form, goog.ui.FormPost);
clover.ui.ComponentToRendererSystem.mixin(clover.ui.form.Form);


/**
 * The component must provides simple markup and styles for four styles of
 * common web forms.
 * @enum {string}
 */
clover.ui.form.Form.FormType = {
  /** Stacked, left-aligned labels over controls. */
  VERTICAL: 'vertical',
  /** Left-aligned label and inline-block controls for compact style. */
  HORIZONTAL: 'horizontal',
  /** Extra-rounded text input for a typical search aesthetic. */
  INLINE: 'inline',
  /** Float left, right-aligned labels on same line as controls. */
  SEARCH: 'search'
};


/**
 * @type {string}
 * @private
 */
clover.ui.form.Form.prototype.formType_ = clover.ui.form.Form.FormType.VERTICAL;


/**
 * Sets a form type.
 * @param {clover.ui.form.Form.FormType} formType A form type.
 */
clover.ui.form.Form.prototype.setFormType = function(formType) {
  this.formType_ = formType;
};


/**
 * Returns the form type.
 * @return {clover.ui.form.Form.FormType} The form type.
 */
clover.ui.form.Form.prototype.getFormType = function(formType) {
  return this.formType_;
};


/**
 * @type {string}
 * @private
 */
clover.ui.form.Form.prototype.formType_ = clover.ui.form.Form.FormType.VERTICAL;


/**
 * @return {clover.ui.form.Form.FormType} Form type.
 */
clover.ui.form.Form.prototype.getFormType = function() {
  return this.formType_;
};


/**
 * @type {goog.events.EventHandler}
 * @private
 */
clover.ui.form.Form.prototype.handler_ = null;


/**
 * Returns the DOM element into which child components are to be rendered,
 * or null if the form itself hasn't been rendered yet.  Overrides
 * {@link goog.ui.Component#getContentElement} by delegating to the renderer.
 * @return {Element} Element to contain child elements (null if none).
 */
clover.ui.form.Form.prototype.getContentElement = function() {
  // Delegate to renderer.
  return this.renderer_.getContentElement(this.getElement());
};


/** @override */
clover.ui.form.Form.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  clover.ui.ComponentToRendererSystem.disposeMixin(this);
};


goog.ui.registry.setDefaultRenderer(clover.ui.form.Form,
    clover.ui.form.FormRenderer);
