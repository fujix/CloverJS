// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of Layout.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractLayout');
goog.require('goog.dom.ViewSizeMonitor');
goog.require('goog.events.EventHandler');
goog.require('goog.ui.Component');



/**
 * Abstract Layout class.
 * @param {?clover.ui.scaffolding.AbstractLayoutRenderer=} opt_renderer Renderer
 *   used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.scaffolding.AbstractLayout = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  var dom = this.getDomHelper();

  this.renderer_ = opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor);

  /** @private */
  this.vsm_ = goog.dom.ViewSizeMonitor.getInstanceForWindow(dom.getWindow());

  /** @private */
  this.listener_ = new goog.events.EventHandler(this);
};
goog.inherits(clover.ui.scaffolding.AbstractLayout, goog.ui.Component);


/**
 * @enum {string}
 */
clover.ui.scaffolding.AbstractLayout.EventType = {
  CHANGE_SCREEN_TYPE: 'cloverchangescreen'
};


/**
 * Screnn types about the device.
 * <dl>
 * <dt>SMARTPHONES
 * <dd>480px and below, Fluid columns, no fixed widths.
 * <dt>SMARTPHONES_TO_TABLETS
 * <dd>767px and below, Fluid columns, no fixed widths.
 * <dt>PORTRAIT_TABLETS
 * <dd>768px and above, Column width is 42px, Gutter width is 20px.
 * <dt>DEFAULT
 * <dd>980px and up, Column width is 60px, Gutter width is 20px.
 * <dt>LARGE_DISPLAY
 * <dd>1200px and up, Column width is 70px, Gutter width is 30px.
 * </dl>
 * @enum {string}
 */
clover.ui.scaffolding.AbstractLayout.ScreenType = {
  SMARTPHONES: 0,
  SMARTPHONES_TO_TABLETS: 1,
  PORTRAIT_TABLETS: 2,
  DEFAULT: 3,
  LARGE_DISPLAY: 4
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {?string=} Renderer used by the component (undefined if none).
 * @protected
 */
clover.ui.scaffolding.AbstractLayout.prototype.getRenderer = function() {
  return this.renderer_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {goog.events.EventHandler} Event handler for this component.
 */
clover.ui.scaffolding.AbstractLayout.prototype.getHandler = function() {
  return this.listener_;
};


/**
 * Returns most recentry type of screen.
 * @return {string} Screen type.
 */
clover.ui.scaffolding.AbstractLayout.prototype.getScreenType = function() {
  var width = this.vsm_.getSize().width;
  var type = clover.ui.scaffolding.AbstractLayout.ScreenType;
  if (width <= 480) return type.SMARTPHONES;
  else if (width <= 767) return type.SMARTPHONES_TO_TABLETS;
  else if (width <= 979) return type.PORTRAIT_TABLETS;
  else if (width <= 1199) return type.DEFAULT;
  else return type.LARGE_DISPLAY;
};


/**
 * Handles resize events.
 */
clover.ui.scaffolding.AbstractLayout.prototype.handleResize = function() {
  var type;
  if (!this.currentScreenType_ ||
      this.currentScreenType_ !== (type = this.getScreenType())) {
    this.currentScreenType_ = type;
    var e = clover.ui.scaffolding.AbstractLayout.EventType.CHANGE_SCREEN_TYPE;
    this.dispathEvent(e);
  }
};


/**
 * Returns true if the given element can be decorated by this component.
 * Overrides {@link goog.ui.Component#canDecorate}.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the element can be decorated by this component.
 */
clover.ui.scaffolding.AbstractLayout.prototype.canDecorate = function(element) {
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
clover.ui.scaffolding.AbstractLayout.prototype.decorateInternal =
    function(element) {
  var element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
};


/**
 * Creates the control's DOM.  Overrides {@link goog.ui.Component#createDom} by
 * delegating DOM manipulation to the control's renderer.
 * @override
 */
clover.ui.scaffolding.AbstractLayout.prototype.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
};


/** @override */
clover.ui.scaffolding.AbstractLayout.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.listener_.listen(
      this.vsm_,
      clover.ui.scaffolding.AbstractLayout.EventType.CHANGE_SCREEN_TYPE,
      this.handleResize);
};


/** @override */
clover.ui.scaffolding.AbstractLayout.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.listener_.removeAll();
};


/** @override */
clover.ui.scaffolding.AbstractLayout.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.vsm_;
  this.listener_.dispose();
  delete this.listener_;
};
