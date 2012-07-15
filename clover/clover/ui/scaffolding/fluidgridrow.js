// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Fluid Grid Row module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractFluidGridRowRenderer');
goog.provide('clover.ui.scaffolding.FluidGridRow');
goog.provide('clover.ui.scaffolding.FluidGridRowRenderer');
goog.require('clover.ui.scaffolding.AbstractGridRow');
goog.require('clover.ui.scaffolding.AbstractGridRowRenderer');
goog.require('goog.ui.registry');



/**
 * Fluid layout gives flexible page structure, min- and max-widths, and a left-
 * hand sidebar. It's great for apps and docs.
 * @param {?clover.ui.scaffolding.AbstractGridRowRenderer=} opt_renderer
 *    Renderer used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGridRow}
 */
clover.ui.scaffolding.FluidGridRow = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer ||
      clover.ui.scaffolding.FluidGridRowRenderer.getInstance(), opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.FluidGridRow,
    clover.ui.scaffolding.AbstractGridRow);



/**
 * Abstract renderer for clover.ui.scaffolding.FluidGridRowRenderer.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGridRowRenderer}
 */
clover.ui.scaffolding.AbstractFluidGridRowRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.AbstractFluidGridRowRenderer,
    clover.ui.scaffolding.AbstractGridRowRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.AbstractFluidGridRowRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractFluidGridRowRenderer.CSS_CLASS =
    goog.getCssName('clover-fluid-grid-row');


/** @override */
clover.ui.scaffolding.AbstractFluidGridRowRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractFluidGridRowRenderer.CSS_CLASS;
};



/**
 * Default renderer for clover.ui.scaffolding.FluidGridRow.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractFluidGridRowRenderer}
 */
clover.ui.scaffolding.FluidGridRowRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.FluidGridRowRenderer,
    clover.ui.scaffolding.AbstractFluidGridRowRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.FluidGridRowRenderer);


/**
 * @const
 * @type {string}
 */
clover.ui.scaffolding.FluidGridRowRenderer.CSS_CLASS =
    goog.getCssName('row-fluid');


/** @override */
clover.ui.scaffolding.FluidGridRowRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.FluidGridRowRenderer.CSS_CLASS;
};


// Register a decorator factory function for FluidGridRow
goog.ui.registry.setDecoratorByClassName(
    clover.ui.scaffolding.FluidGridRowRenderer.CSS_CLASS,
    function() {
      return new clover.ui.scaffolding.FluidGridRow(null);
    });
