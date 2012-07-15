// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of Grid.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractGridRenderer');



/**
 * Abstract Renderer class for Grid.
 * @constructor
 */
clover.ui.scaffolding.AbstractGridRenderer = function() {
};


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractGridRenderer.CSS_CLASS =
    goog.getCssName('clover-grid');


/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractGridRenderer.CSS_CLASS;
};


/**
 * Returns the grid's with the renderer's own CSS class.
 * @param {clover.ui.AbstractGrid} grid Grid to render.
 * @return {Element} Root element for the grid.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.createDom = function(
    grid) {
  var element = grid.getDomHelper().createDom('div', this.getClass(grid),
      grid.getContent());
  return element;
};


/**
 * Returns true if this renderer can decorate the element, false otherwise.
 * The default implementation always returns true.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.canDecorate =
    function(element) {
  return true;
};


/**
 * Default implementation of {@code decorate} for
 * {@link clover.ui.scaffolding.Grid}s. Initializes the grid's ID, its CSS
 * classes, respectively.  Returns the element.
 * @param {clover.ui.scaffolding.AbstractGrid} grid Grid instance to
 *    decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.decorate =
    function(grid, element) {
  // Set the grid's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    grid.setId(element.id);
  }

  // Decorate the element's children, if applicable.  This should happen after
  // the grid's own state has been initialized, since how children are
  // decorated may depend on the state of the grid.
  this.decorateChildren(grid, element);
  return element;
};


/**
 * Takes a grid and an element that may contain child elements, decorates
 * the child elements, and adds the corresponding components to the grid
 * as child components.  Any non-element child nodes (e.g. empty text nodes
 * introduced by line breaks in the HTML source) are removed from the element.
 * @param {clover.ui.scaffolding.AbstractGridRenderer} grid Grid whose
 *    children are to be discovered.
 * @param {Element} element Element whose children are to be decorated.
 * @param {Element=} opt_firstChild the first child to be decorated.
 * @suppress {visibility} setElementInternal
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.decorateChildren =
    function(grid, element, opt_firstChild) {
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
          grid.addChild(child);
          child.decorate(/** @type {Element} */(node));
        }
      } else if (!node.nodeValue || goog.string.trim(node.nodeValue) == '') {
        // Remove empty text node, otherwise madness ensues (e.g. grids that
        // use goog-inline-block will flicker and shift on hover on Gecko).
        element.removeChild(node);
      }
      node = next;
    }
  }
};


/**
 * Inspects the element, and creates an instance of
 * {@link clover.ui.scaffolding.AbstractGridRenderer} or an appropriate
 * subclass best suited to decorate it.  Returns the grid (or null if no
 * suitable class was found).  This default implementation uses the element's
 * CSS class to find the appropriate grid class to instantiate.
 * May be overridden in subclasses.
 * @param {Element} element Element to decorate.
 * @return {?clover.ui.scaffolding.AbstractGridRow} A new grid suitable to
 *    decorate the element (null if none).
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.getDecoratorForChild =
    function(element) {
  return (/** @type {clover.ui.scaffolding.AbstractGrid} */
      goog.ui.registry.getDecorator(element));
};


/**
 * Takes a grid's root element, and sets its content to the given text
 * caption or DOM structure.  The default implementation replaces the children
 * of the given element.  Renderers that create more complex DOM structures
 * must override this method accordingly.
 * @param {Element} element The grid's root element.
 * @param {string|Element} content Text caption or DOM structure to be
 *     set as the grid's content. The DOM nodes will not be cloned, they
 *     will only moved under the content element of the grid.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.setContent = function(
    element, content) {
  var contentElem = this.getContentElement(element);
  if (contentElem) {
    goog.dom.removeChildren(contentElem);
    if (content) {
      if (goog.isString(content)) {
        goog.dom.setTextContent(contentElem, content);
      } else {
        var childHandler = function(child) {
          if (child) {
            var doc = goog.dom.getOwnerDocument(contentElem);
            contentElem.appendChild(goog.isString(child) ?
                doc.createTextNode(child) : child);
          }
        };
        if (goog.isArray(content)) {
          // Array of nodes.
          goog.array.forEach(content, childHandler);
        } else if (goog.isArrayLike(content) && !('nodeType' in content)) {
          // NodeList. The second condition filters out TextNode which also has
          // length attribute but is not array like. The nodes have to be cloned
          // because childHandler removes them from the list during iteration.
          goog.array.forEach(goog.array.clone(/** @type {NodeList} */(content)),
              childHandler);
        } else {
          // Node or string.
          childHandler(content);
        }
      }
    }
  }
};


/**
 * Takes the grid's root element and returns the parent element of the
 * grid's contents.  Since by default grids are rendered as a single
 * DIV, the default implementation returns the element itself.  Subclasses
 * with more complex DOM structures must override this method as needed.
 * @param {Element} element Root element of the grid whose content element
 *     is to be returned.
 * @return {Element} The grid's content element.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.getContentElement =
    function(element) {
  return element;
};


/**
 * Sets width of the grid.
 * @param {clover.ui.scaffolding.AbstractGrid} grid No description.
 * @param {number} width No description.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.setWidth =
    goog.abstractMethod;

/**
 * Sets offset of the grid.
 * @param {clover.ui.scaffolding.AbstractGrid} grid No description.
 * @param {number} offset No description.
 */
clover.ui.scaffolding.AbstractGridRenderer.prototype.setOffset =
    goog.abstractMethod;
