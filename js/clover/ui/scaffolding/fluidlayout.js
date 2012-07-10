// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for UI modules for CloverJS.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.FluidLayout');
goog.require('clover.ui.scaffolding.AbstractLayout');



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
  goog.base(this, opt_renderer, opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.FluidLayout,
    clover.ui.scaffolding.AbstractLayout);


/**
 * @const
 * @type {string}
 */
clover.ui.scaffolding.FluidLayout.CSS_CLASS =
    goog.getCssName('container-fluid');
