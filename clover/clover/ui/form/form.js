// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.Form');
goog.provide('clover.ui.form.Form.FormType');

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
  this.renderer_ = opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor);
  if (opt_formType) this.formType_ = opt_formType;
  this.handler_ = new goog.events.EventHandler(this);
};
goog.inherits(clover.ui.form.Form, goog.ui.FormPost);


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
 * Returns true if the given element can be decorated by this component.
 * Overrides {@link goog.ui.FormPost#canDecorate}.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the element can be decorated by this component.
 */
clover.ui.form.Form.prototype.canDecorate = function(element) {
  // Controls support pluggable renderers; delegate to the renderer.
  return this.renderer_.canDecorate(element);
};


/**
 * Decorates the given element with this component. Overrides {@link
 * goog.uiFormPost#decorateInternal} by delegating DOM manipulation
 * to the form's renderer.
 * @param {Element} element Element to decorate.
 * @protected
 * @override
 */
clover.ui.form.Form.prototype.decorateInternal = function(element) {
  element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
};


/**
 * Creates the form's DOM.  Overrides {@link goog.ui.FormPost#createDom} by
 * delegating DOM manipulation to the form's renderer.
 * @override
 */
clover.ui.form.Form.prototype.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
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
 * Returns the event handler for this component.
 * @return {goog.events.EventHandler} The event handler.
 */
clover.ui.form.Form.prototype.getHandler = function() {
  return this.handler_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {clover.ui.form.FormRenderer|undefined} Renderer used by the
 *     component (undefined if none).
 */
clover.ui.form.Form.prototype.getRenderer = function() {
  return this.renderer_;
};


/**
 * Registers the given renderer with the component.  Changing renderers after
 * the component has entered the document is an error.
 * @param {clover.ui.form.FormRenderer} renderer Renderer used by the component.
 * @throws {Error} If the form is already in the document.
 */
clover.ui.form.Form.prototype.setRenderer = function(renderer) {
  if (this.isInDocument()) {
    // Too late.
    throw Error(goog.ui.Component.Error.ALREADY_RENDERED);
  }

  if (this.getElement()) {
    // The component has already been rendered, but isn't yet in the document.
    // Replace the renderer and delete the current DOM, so it can be re-rendered
    // using the new renderer the next time someone calls render().
    this.setElementInternal(null);
  }

  this.renderer_ = renderer;
};


/**
 * Returns any additional class name(s) to be applied to the component's
 * root element, or null if no extra class names are needed.
 * @return {Array.<string>?} Additional class names to be applied to
 *     the component's root element (null if none).
 */
clover.ui.form.Form.prototype.getExtraClassNames = function() {
  return this.extraClassNames_;
};


/**
 * Adds the given class name to the list of classes to be applied to the
 * component's root element.
 * @param {string} className Additional class name to be applied to the
 *     component's root element.
 */
clover.ui.form.Form.prototype.addClassName = function(className) {
  if (className) {
    if (this.extraClassNames_) {
      if (!goog.array.contains(this.extraClassNames_, className)) {
        this.extraClassNames_.push(className);
      }
    } else {
      this.extraClassNames_ = [className];
    }
    this.renderer_.enableExtraClassName(this, className, true);
  }
};


/**
 * Removes the given class name from the list of classes to be applied to
 * the component's root element.
 * @param {string} className Class name to be removed from the component's root
 *     element.
 */
clover.ui.form.Form.prototype.removeClassName = function(className) {
  if (className && this.extraClassNames_) {
    goog.array.remove(this.extraClassNames_, className);
    if (this.extraClassNames_.length == 0) {
      this.extraClassNames_ = null;
    }
    this.renderer_.enableExtraClassName(this, className, false);
  }
};


/**
 * Adds or removes the given class name to/from the list of classes to be
 * applied to the component's root element.
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
clover.ui.form.Form.prototype.enableClassName = function(className, enable) {
  if (enable) {
    this.addClassName(className);
  } else {
    this.removeClassName(className);
  }
};


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


// Component content management.


/**
 * Returns the text caption or DOM structure displayed in the component.
 * @return {goog.ui.ControlContent} Text caption or DOM structure
 *     comprising the component's contents.
 */
clover.ui.form.Form.prototype.getContent = function() {
  return this.content_;
};


/**
 * Sets the component's content to the given text caption, element, or array
 * of nodes.  Unlike {@link #setContent}, doesn't modify the component's DOM.
 * Called by renderers during element decoration.  Considered protected; should
 * only be used within this package and by subclasses.
 * @param {goog.ui.ControlContent} content Text caption or DOM structure
 *     to set as the component's contents.
 * @protected
 */
clover.ui.form.Form.prototype.setContentInternal = function(content) {
  this.content_ = content;
};


/**
 * Returns true.
 * @return {boolean} Always return true.
 */
clover.ui.form.Form.prototype.isEnabled = function() {
  return true;
};


goog.ui.registry.setDefaultRenderer(clover.ui.form.Form,
    clover.ui.form.FormRenderer);
