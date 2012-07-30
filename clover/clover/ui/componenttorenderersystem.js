// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for component-to-renderer system implemention.
 * The module provides a mixin like implemention for Component-to-Renderer
 * pattern.
 *
 * {@link goog.ui.Component} is not support a Component-to-Renderer system.
 * So, you should implement (or override) some methods such as below.
 *
 * <ul>
 *   <li> getRenderer() => *
 *   <li> setRenderer(*)
 *   <li> canDecorate() => true
 *   <li> decorateInternal()
 *   <li> createDom() => Element
 *   <li> disposeInternal()
 * </ul>
 *
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.ComponentToRendererSystem');

goog.require('goog.object');
goog.require('goog.ui.registry');



/**
 * Component-to-Renderer system implemention.
 * @param {*=} opt_renderer Renderer to link the component.
 * @constructor
 */
clover.ui.ComponentToRendererSystem = function(opt_renderer) {
  this.renderer_ = opt_renderer ||
        goog.ui.registry.getDefaultRenderer(this.constructor);
};


/**
 * Mixin methods for a renderer.
 * @param {Function:goog.ui.Component} componentCtor Component constructor.
 * @this {goog.ui.Component}
 */
clover.ui.ComponentToRendererSystem.mixin = function(componentCtor) {
  // Mixin methods.
  goog.object.extend(
      componentCtor.prototype, clover.ui.ComponentToRendererSystem.prototype);
};


/**
 * Mixin methods for a renderer.
 * @param {goog.ui.Component} componentCtor Component constructor.
 * @param {...*} var_args The list.
 * @this {goog.ui.Component}
 */
clover.ui.ComponentToRendererSystem.initializeMixin = function(
    scope) {
  var args = Array.prototype.slice.call(arguments, 1)
  clover.ui.ComponentToRendererSystem.apply(scope, args);
};


/**
 * Mixin methods for a renderer.
 * @param {goog.ui.Component} componentCtor Component constructor.
 * @param {...*} var_args The list.
 * @this {goog.ui.Component}
 */
clover.ui.ComponentToRendererSystem.disposeMixin = function(
    scope) {
  delete scope.renderer_;
};


/**
 * Renderer associated with the component.
 * @type {*}
 * @private
 */
clover.ui.ComponentToRendererSystem.prototype.renderer_ = null;


/**
 * @protected
 */
clover.ui.ComponentToRendererSystem.prototype.handleDisposeInternal =
    function() {
  delete this.renderer_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {goog.ui.ControlRenderer|undefined} Renderer used by the component
 *     (undefined if none).
 */
clover.ui.ComponentToRendererSystem.prototype.getRenderer = function() {
  return this.renderer_;
};


/**
 * Registers the given renderer with the component.  Changing renderers after
 * the component has entered the document is an error.
 * @param {*} renderer Renderer used by the component.
 * @throws {Error} If the control is already in the document.
 */
clover.ui.ComponentToRendererSystem.prototype.setRenderer = function(
    renderer) {
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


// Standard goog.ui.Component implementation.


/**
 * Creates the control's DOM.  Overrides {@link goog.ui.Component#createDom} by
 * delegating DOM manipulation to the control's renderer.
 * @override
 */
clover.ui.ComponentToRendererSystem.prototype.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
};


/**
 * Returns true if the given element can be decorated by this component.
 * Overrides {@link goog.ui.Component#canDecorate}.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the element can be decorated by this component.
 */
clover.ui.ComponentToRendererSystem.prototype.canDecorate = function(
    element) {
  // Controls support pluggable renderers; delegate to the renderer.
  return this.renderer_.canDecorate(element);
};


/**
 * Decorates the given element with this component. Overrides {@link
 * goog.ui.Component#decorateInternal} by delegating DOM manipulation
 * to the control's renderer.
 * @param {Element} element Element to decorate.
 * @protected
 * @override
 */
clover.ui.ComponentToRendererSystem.prototype.decorateInternal = function(
    element) {
  element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
};
