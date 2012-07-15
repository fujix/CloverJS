// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of Layout.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractLayoutRenderer');
goog.require('goog.ui.registry');



/**
 * Abstract Renderer class for Layout.
 * @constructor
 */
clover.ui.scaffolding.AbstractLayoutRenderer = function() {
};


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractLayoutRenderer.CSS_CLASS =
    goog.getCssName('clover-layout');


/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractLayoutRenderer.CSS_CLASS;
};


/**
 * Returns the DOM element into which child components are to be rendered,
 * or null if the layout hasn't been rendered yet.
 * @param {Element} element Root element of the layout whose content element
 *     is to be returned.
 * @return {Element} Element to contain child elements (null if none).
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.getContentElement =
    function(element) {
  return element;
};


/**
 * Returns the layout's with the renderer's own CSS class.
 * @param {clover.ui.AbstractLayout} layout Layout to render.
 * @return {Element} Root element for the layout.
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.createDom = function(
    layout) {
  var element = layout.getDomHelper().createDom('div', this.getCssClass());
  return element;
};


/**
 * Returns true if this renderer can decorate the element, false otherwise.
 * The default implementation always returns true.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.canDecorate =
    function(element) {
  return true;
};


/**
 * Default implementation of {@code decorate} for
 * {@link clover.ui.scaffolding.Layout}s. Initializes the layout's ID, its CSS
 * classes, respectively.  Returns the element.
 * @param {clover.ui.scaffolding.AbstractLayout} layout Layout instance to
 *    decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.decorate =
    function(layout, element) {
  // Set the layout's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    layout.setId(element.id);
  }

  // Decorate the element's children, if applicable.  This should happen after
  // the layout's own state has been initialized, since how children are
  // decorated may depend on the state of the layout.
  this.decorateChildren(layout, element);
  return element;
};


/**
 * Takes a layout and an element that may contain child elements, decorates
 * the child elements, and adds the corresponding components to the layout
 * as child components.  Any non-element child nodes (e.g. empty text nodes
 * introduced by line breaks in the HTML source) are removed from the element.
 * @param {clover.ui.scaffolding.AbstractLayoutRenderer} layout Layout whose
 *    children are to be discovered.
 * @param {Element} element Element whose children are to be decorated.
 * @param {Element=} opt_firstChild the first child to be decorated.
 * @suppress {visibility} setElementInternal
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.decorateChildren =
    function(layout, element, opt_firstChild) {
  if (element) {
    var node = opt_firstChild || element.firstChild, next;
    // Tag soup HTML may result in a DOM where siblings have different parents.
    while (node && node.parentNode == element) {
      // Get the next sibling here, since the node may be replaced or removed.
      next = node.nextSibling;
      if (node.nodeType == goog.dom.NodeType.ELEMENT) {
        // Decorate element node.
        var child = this.getDecoratorForChild(/** @type {Element} */(node));
        if (child) {
          // addChild() may need to look at the element.
          child.setElementInternal(/** @type {Element} */(node));
          layout.addChild(child);
          child.decorate(/** @type {Element} */(node));
        }
      } else if (!node.nodeValue || goog.string.trim(node.nodeValue) == '') {
        // Remove empty text node, otherwise madness ensues (e.g. controls that
        // use goog-inline-block will flicker and shift on hover on Gecko).
        element.removeChild(node);
      }
      node = next;
    }
  }
};


/**
 * Inspects the element, and creates an instance of
 * {@link clover.ui.scaffolding.AbstractLayoutRenderer} or an appropriate
 * subclass best suited to decorate it.  Returns the control (or null if no
 * suitable class was found).  This default implementation uses the element's
 * CSS class to find the appropriate control class to instantiate.
 * May be overridden in subclasses.
 * @param {Element} element Element to decorate.
 * @return {?clover.ui.scaffolding.AbstractGridRow} A new control suitable to
 *    decorate the element (null if none).
 */
clover.ui.scaffolding.AbstractLayoutRenderer.prototype.getDecoratorForChild =
    function(element) {
  return (/** @type {goog.ui.Control} */
      goog.ui.registry.getDecorator(element));
};
