// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for UI modules for CloverJS.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.Container');
goog.require('goog.ui.ContainerRenderer');



/**
 *
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
clover.ui.scaffolding.ContainerRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.ContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.ContainerRenderer);