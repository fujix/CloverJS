// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Fixed Grid Row module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractFixedGridRowRenderer');
goog.provide('clover.ui.scaffolding.FixedGridRow');
goog.provide('clover.ui.scaffolding.FixedGridRowRenderer');
goog.require('clover.ui.scaffolding.AbstractGridRow');
goog.require('clover.ui.scaffolding.AbstractGridRowRenderer');
goog.require('goog.ui.registry');



/**
 * Fixed layout gives flexible page structure, min- and max-widths, and a left-
 * hand sidebar. It's great for apps and docs.
 * @param {?clover.ui.scaffolding.AbstractGridRowRenderer=} opt_renderer
 *    Renderer used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGridRow}
 */
clover.ui.scaffolding.FixedGridRow = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer ||
      clover.ui.scaffolding.FixedGridRowRenderer.getInstance(), opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.FixedGridRow,
    clover.ui.scaffolding.AbstractGridRow);



/**
 * Abstract renderer for clover.ui.scaffolding.FixedGridRowRenderer.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGridRowRenderer}
 */
clover.ui.scaffolding.AbstractFixedGridRowRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.AbstractFixedGridRowRenderer,
    clover.ui.scaffolding.AbstractGridRowRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.AbstractFixedGridRowRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractFixedGridRowRenderer.CSS_CLASS =
    goog.getCssName('clover-fixed-grid-row');


/** @override */
clover.ui.scaffolding.AbstractFixedGridRowRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractFixedGridRowRenderer.CSS_CLASS;
};



/**
 * Default renderer for clover.ui.scaffolding.FixedGridRow.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractFixedGridRowRenderer}
 */
clover.ui.scaffolding.FixedGridRowRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.FixedGridRowRenderer,
    clover.ui.scaffolding.AbstractFixedGridRowRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.FixedGridRowRenderer);


/**
 * @const
 * @type {string}
 */
clover.ui.scaffolding.FixedGridRowRenderer.CSS_CLASS =
    goog.getCssName('row');


/** @override */
clover.ui.scaffolding.FixedGridRowRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.FixedGridRowRenderer.CSS_CLASS;
};


// Register a decorator factory function for FixedGridRow
goog.ui.registry.setDecoratorByClassName(
    clover.ui.scaffolding.FixedGridRowRenderer.CSS_CLASS,
    function() {
      return new clover.ui.scaffolding.FixedGridRow(null);
    });
