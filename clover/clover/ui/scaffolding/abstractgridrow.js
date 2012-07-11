// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of GridRow.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractGridRow');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');



/**
 * Abstract GridRow class.
 * @param {?clover.ui.scaffolding.AbstractGridRowRenderer=} opt_renderer
 *    Renderer used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.scaffolding.AbstractGridRow = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  var dom = this.getDomHelper();

  this.renderer_ = opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor);

  /** @private */
  this.listener_ = new goog.events.EventHandler(this);
};
goog.inherits(clover.ui.scaffolding.AbstractGridRow, goog.ui.Component);


/**
 * @enum {string}
 */
clover.ui.scaffolding.AbstractGridRow.EventType = {
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {?string=} Renderer used by the component (undefined if none).
 * @protected
 */
clover.ui.scaffolding.AbstractGridRow.prototype.getRenderer = function() {
  return this.renderer_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {goog.events.EventHandler} Event handler for this component.
 */
clover.ui.scaffolding.AbstractGridRow.prototype.getHandler = function() {
  return this.listener_;
};


/**
 * Returns true if the given element can be decorated by this component.
 * Overrides {@link goog.ui.Component#canDecorate}.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the element can be decorated by this component.
 */
clover.ui.scaffolding.AbstractGridRow.prototype.canDecorate = function(
    element) {
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
clover.ui.scaffolding.AbstractGridRow.prototype.decorateInternal =
    function(element) {
  var element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
};


/**
 * Creates the control's DOM.  Overrides {@link goog.ui.Component#createDom} by
 * delegating DOM manipulation to the control's renderer.
 * @override
 */
clover.ui.scaffolding.AbstractGridRow.prototype.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
};


/** @override */
clover.ui.scaffolding.AbstractGridRow.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @override */
clover.ui.scaffolding.AbstractGridRow.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.listener_.removeAll();
};


/** @override */
clover.ui.scaffolding.AbstractGridRow.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.listener_.dispose();
  delete this.listener_;
};
