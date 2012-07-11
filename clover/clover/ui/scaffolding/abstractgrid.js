// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of Grid.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractGrid');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('goog.ui.Component');
goog.require('goog.ui.registry');



/**
 * Abstract Grid class.
 * @param {text|Element} content Text caption or DOM structure to display as the
 *    content of the component (if any).
 * @param {number} width Grid width.
 * @param {?number=} opt_offset Offset grom the left end.
 * @param {?clover.ui.scaffolding.AbstractGridRenderer=} opt_renderer
 *    Renderer used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
clover.ui.scaffolding.AbstractGrid = function(content, width, opt_offset,
    opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  var dom = this.getDomHelper();

  this.renderer_ = opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor);

  this.setContentInternal(content);

  this.setWidthInternal(width);
  if (opt_offset) this.setOffsetInternal(opt_offset);

  /** @private */
  this.listener_ = new goog.events.EventHandler(this);
};
goog.inherits(clover.ui.scaffolding.AbstractGrid, goog.ui.Component);


/**
 * @enum {string}
 */
clover.ui.scaffolding.AbstractGrid.EventType = {
};


/**
 * Checks if the value is a positive number and not 0 if
 * {@link goog.asserts.ENABLE_ASSERTS} is true.
 * @param {number} number The number to check.
 * @param {number} The ckecked number.
 * @private
 */
clover.ui.scaffolding.AbstractGrid.prototype.assertPositiveNumber_ =
    function(number) {
  goog.asserts.assertNumber(number);
  goog.asserts.assert(number >= 0,
      'Expected positive number but got negative: %s.', number);
  return number;
};


/**
 * @private
 * @type {string}
 */
clover.ui.scaffolding.AbstractGrid.prototype.width_ = null;


/**
 * Returns width of the grid.
 * @return {number} Width.
 */
clover.ui.scaffolding.AbstractGrid.prototype.getWidth = function() {
  return this.width_;
};


/**
 * Sets width of the grid. Unlike {@link #setWidth}, doesn't update the
 * component's styling, and doesn't reject unsupported width. Called by
 * renderers during element decoration.  Considered protected; should only be
 * used within this package and by subclasses.
 * @param {number} width No description.
 * @protected
 */
clover.ui.scaffolding.AbstractGrid.prototype.setWidthInternal =
    function(width) {
  this.assertPositiveNumber_(width);
  this.width_ = width;
};


/**
 * Sets width of the grid.
 * @param {number} width No description.
 */
clover.ui.scaffolding.AbstractGrid.prototype.setWidth = function(width) {
  this.setWidthInternal(width);
  this.renderer_.setWidth(this, width);
};


/**
 * @private
 * @type {string}
 */
clover.ui.scaffolding.AbstractGrid.prototype.offset_ = 0;


/**
 * Returns offset of the grid.
 * @return {number} Offset.
 */
clover.ui.scaffolding.AbstractGrid.prototype.getOffset = function() {
  return this.offset_;
};


/**
 * Sets offset of the grid. Unlike {@link #setWidth}, doesn't update the
 * component's styling, and doesn't reject unsupported offset. Called by
 * renderers during element decoration.  Considered protected; should only be
 * used within this package and by subclasses.
 * @param {number} offset Offset from the left end.
 * @protected
 */
clover.ui.scaffolding.AbstractGrid.prototype.setOffsetInternal = function(offset) {
  this.assertPositiveNumber_(offset);
  this.offset_ = offset;
};


/**
 * Sets offset of the grid.
 * @param {number} offset Offset from the left end.
 */
clover.ui.scaffolding.AbstractGrid.prototype.setOffset = function(offset) {
  this.setOffsetInternal(offset);
  this.renderer_.setOffset(this, offset);
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {?string=} Renderer used by the component (undefined if none).
 * @protected
 */
clover.ui.scaffolding.AbstractGrid.prototype.getRenderer = function() {
  return this.renderer_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {goog.events.EventHandler} Event handler for this component.
 */
clover.ui.scaffolding.AbstractGrid.prototype.getHandler = function() {
  return this.listener_;
};


/**
 * Returns true if the given element can be decorated by this component.
 * Overrides {@link goog.ui.Component#canDecorate}.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the element can be decorated by this component.
 */
clover.ui.scaffolding.AbstractGrid.prototype.canDecorate = function(
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
clover.ui.scaffolding.AbstractGrid.prototype.decorateInternal =
    function(element) {
  var element = this.renderer_.decorate(this, element);
  this.setElementInternal(element);
};


/**
 * Creates the control's DOM.  Overrides {@link goog.ui.Component#createDom} by
 * delegating DOM manipulation to the control's renderer.
 * @override
 */
clover.ui.scaffolding.AbstractGrid.prototype.createDom = function() {
  var element = this.renderer_.createDom(this);
  this.setElementInternal(element);
};


/** @override */
clover.ui.scaffolding.AbstractGrid.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};


/** @override */
clover.ui.scaffolding.AbstractGrid.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.listener_.removeAll();
};


/** @override */
clover.ui.scaffolding.AbstractGrid.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.listener_.dispose();
  delete this.listener_;
};


// Component content management.


/**
 * Returns the text caption or DOM structure displayed in the component.
 * @return {clover.ui.scaffolding.AbstractGridContent} Text caption or DOM structure
 *     comprising the component's contents.
 */
clover.ui.scaffolding.AbstractGrid.prototype.getContent = function() {
  return this.content_;
};


/**
 * Sets the component's content to the given text caption, element, or array of
 * nodes.  (If the argument is an array of nodes, it must be an actual array,
 * not an array-like object.)
 * @param {string|Element} content Text caption or DOM structure to set as the
 *    component's contents.
 */
clover.ui.scaffolding.AbstractGrid.prototype.setContent = function(content) {
  // Controls support pluggable renderers; delegate to the renderer.
  this.renderer_.setContent(this.getElement(), content);

  // setContentInternal needs to be after the renderer, since the implementation
  // may depend on the content being in the DOM.
  this.setContentInternal(content);
};


/**
 * Sets the component's content to the given text caption, element, or array
 * of nodes.  Unlike {@link #setContent}, doesn't modify the component's DOM.
 * Called by renderers during element decoration.  Considered protected; should
 * only be used within this package and by subclasses.
 * @param {string|Element} content Text caption or DOM structure to set as the
 *    component's contents.
 * @protected
 */
clover.ui.scaffolding.AbstractGrid.prototype.setContentInternal = function(
    content) {
  this.content_ = content;
};


/**
 * @return {string} Text caption of the control or empty string if none.
 */
clover.ui.scaffolding.AbstractGrid.prototype.getCaption = function() {
  var content = this.getContent();
  if (!content) {
    return '';
  }
  var caption =
      goog.isString(content) ? content :
      goog.isArray(content) ? goog.array.map(content,
          goog.dom.getRawTextContent).join('') :
      goog.dom.getTextContent(/** @type {!Node} */ (content));
  return goog.string.collapseBreakingSpaces(caption);
};


/**
 * Sets the text caption of the component.
 * @param {string} caption Text caption of the component.
 */
clover.ui.scaffolding.AbstractGrid.prototype.setCaption = function(caption) {
  this.setContent(caption);
};
