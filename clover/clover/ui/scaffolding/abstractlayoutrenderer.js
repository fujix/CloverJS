// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Abstracr class of Layout.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractLayoutRenderer');



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
  return element;
};
