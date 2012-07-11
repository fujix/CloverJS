// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of GridRow.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractGridRowRenderer');



/**
 * Abstract Renderer class for GridRow.
 * @constructor
 */
clover.ui.scaffolding.AbstractGridRowRenderer = function() {
};


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractGridRowRenderer.CSS_CLASS =
    goog.getCssName('clover-grid-row');


/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractGridRowRenderer.CSS_CLASS;
};


/**
 * Returns the gridRow's with the renderer's own CSS class.
 * @param {clover.ui.AbstractGridRow} gridRow GridRow to render.
 * @return {Element} Root element for the gridRow.
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.createDom = function(
    gridRow) {
  var element = gridRow.getDomHelper().createDom('div', this.getCssClass());
  return element;
};


/**
 * Returns true if this renderer can decorate the element, false otherwise.
 * The default implementation always returns true.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.canDecorate =
    function(element) {
  return true;
};


/**
 * Default implementation of {@code decorate} for
 * {@link clover.ui.scaffolding.GridRow}s. Initializes the gridRow's ID, its CSS
 * classes, respectively.  Returns the element.
 * @param {clover.ui.scaffolding.AbstractGridRow} gridRow GridRow instance to
 *    decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.decorate =
    function(gridRow, element) {
  // Set the gridRow's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    gridRow.setId(element.id);
  }

  // Decorate the element's children, if applicable.  This should happen after
  // the gridRow's own state has been initialized, since how children are
  // decorated may depend on the state of the gridRow.
  this.decorateChildren(gridRow, element);
  return element;
};


/**
 * Takes a gridRow and an element that may contain child elements, decorates
 * the child elements, and adds the corresponding components to the gridRow
 * as child components.  Any non-element child nodes (e.g. empty text nodes
 * introduced by line breaks in the HTML source) are removed from the element.
 * @param {clover.ui.scaffolding.AbstractGridRowRenderer} gridRow GridRow whose
 *    children are to be discovered.
 * @param {Element} element Element whose children are to be decorated.
 * @param {Element=} opt_firstChild the first child to be decorated.
 * @suppress {visibility} setElementInternal
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.decorateChildren =
    function(gridRow, element, opt_firstChild) {
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
          gridRow.addChild(child);
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
 * {@link clover.ui.scaffolding.AbstractGridRowRenderer} or an appropriate
 * subclass best suited to decorate it.  Returns the control (or null if no
 * suitable class was found).  This default implementation uses the element's
 * CSS class to find the appropriate control class to instantiate.
 * May be overridden in subclasses.
 * @param {Element} element Element to decorate.
 * @return {?clover.ui.scaffolding.AbstractGridRow} A new control suitable to
 *    decorate the element (null if none).
 */
clover.ui.scaffolding.AbstractGridRowRenderer.prototype.getDecoratorForChild =
    function(element) {
  return (/** @type {goog.ui.Control} */
      goog.ui.registry.getDecorator(element));
};
