// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Fluid layout module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractFluidLayoutRenderer');
goog.provide('clover.ui.scaffolding.FluidLayout');
goog.provide('clover.ui.scaffolding.FluidLayoutRenderer');
goog.require('clover.ui.scaffolding.AbstractLayout');
goog.require('clover.ui.scaffolding.AbstractLayoutRenderer');
goog.require('goog.ui.registry');



/**
 * Fluid layout gives flexible page structure, min- and max-widths, and a left-
 * hand sidebar. It's great for apps and docs.
 * @param {?clover.ui.scaffolding.AbstractLayoutRenderer=} opt_renderer Renderer
 *   used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractLayout}
 */
clover.ui.scaffolding.FluidLayout = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer ||
      clover.ui.scaffolding.FluidLayoutRenderer.getInstance(), opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.FluidLayout,
    clover.ui.scaffolding.AbstractLayout);



/**
 * Abstract renderer for clover.ui.scaffolding.FluidLayoutRenderer.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractLayoutRenderer}
 */
clover.ui.scaffolding.AbstractFluidLayoutRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.AbstractFluidLayoutRenderer,
    clover.ui.scaffolding.AbstractLayoutRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.AbstractFluidLayoutRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractFluidLayoutRenderer.CSS_CLASS =
    goog.getCssName('clover-fluid-layout');


/** @override */
clover.ui.scaffolding.AbstractFluidLayoutRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractFluidLayoutRenderer.CSS_CLASS;
};



/**
 * Default renderer for clover.ui.scaffolding.FluidLayout.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractFluidLayoutRenderer}
 */
clover.ui.scaffolding.FluidLayoutRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.FluidLayoutRenderer,
    clover.ui.scaffolding.AbstractFluidLayoutRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.FluidLayoutRenderer);


/**
 * @const
 * @type {string}
 */
clover.ui.scaffolding.FluidLayoutRenderer.CSS_CLASS =
    goog.getCssName('container-fluid');


/** @override */
clover.ui.scaffolding.FluidLayoutRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.FluidLayoutRenderer.CSS_CLASS;
};


// Register a decorator factory function for FluidLayout
goog.ui.registry.setDecoratorByClassName(
    clover.ui.scaffolding.FluidLayoutRenderer.CSS_CLASS,
    function() {
      return new clover.ui.scaffolding.FluidLayout(null);
    });
