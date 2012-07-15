// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Fixed layout module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.AbstractFixedLayoutRenderer');
goog.provide('clover.ui.scaffolding.FixedLayout');
goog.provide('clover.ui.scaffolding.FixedLayoutRenderer');
goog.require('clover.ui.scaffolding.AbstractLayout');
goog.require('clover.ui.scaffolding.AbstractLayoutRenderer');
goog.require('goog.ui.registry');


/**
 * The default and simple 940px-wide, centered layout for just about any website
 * or page.
 * @param {?clover.ui.scaffolding.AbstractLayoutRenderer=} opt_renderer Renderer
 *   used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractLayout}
 */
clover.ui.scaffolding.FixedLayout = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_renderer ||
      clover.ui.scaffolding.FixedLayoutRenderer.getInstance(), opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.FixedLayout,
    clover.ui.scaffolding.AbstractLayout);



/**
 * Abstract renderer for clover.ui.scaffolding.FixedLayoutRenderer.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractLayoutRenderer}
 */
clover.ui.scaffolding.AbstractFixedLayoutRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.AbstractFixedLayoutRenderer,
    clover.ui.scaffolding.AbstractLayoutRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.AbstractFixedLayoutRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.AbstractFixedLayoutRenderer.CSS_CLASS =
    goog.getCssName('clover-fixed-layout');


/** @override */
clover.ui.scaffolding.AbstractFixedLayoutRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.AbstractFixedLayoutRenderer.CSS_CLASS;
};



/**
 * Default renderer for clover.ui.scaffolding.FixedLayout.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractFixedLayoutRenderer}
 */
clover.ui.scaffolding.FixedLayoutRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.FixedLayoutRenderer,
    clover.ui.scaffolding.AbstractFixedLayoutRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.FixedLayoutRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.scaffolding.FixedLayoutRenderer.CSS_CLASS =
    goog.getCssName('container');


/** @override */
clover.ui.scaffolding.FixedLayoutRenderer.prototype.getCssClass =
    function() {
  return clover.ui.scaffolding.FixedLayoutRenderer.CSS_CLASS;
};


// Register a decorator factory function for FixedLayout
goog.ui.registry.setDecoratorByClassName(
    clover.ui.scaffolding.FixedLayoutRenderer.CSS_CLASS,
    function() {
      return new clover.ui.scaffolding.FixedLayout(null);
    });
